import { FastifyReply, FastifyRequest } from 'fastify';
import { authService } from './auth.service';
import { LoginInput } from './auth.schemas';
import { randomUUID } from 'crypto';

export class AuthController {
  
  async login(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
    try {
      const user = await authService.validateLogin(request.body);
      
      const jti = randomUUID();
      
      // 1. Gera Access Token (via plugin configurado no Server)
      const accessToken = await reply.jwtSign({
        id: user.id,
        role: user.role,
        jti
      });

      // 2. Gera Refresh Token (opaco, Redis)
      const refreshToken = await authService.generateRefreshToken(user.id);

      // 3. Define Cookie HttpOnly pro Refresh
      reply.setCookie('admin_refresh_token', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 // 7 dias
      });

      // 4. Retorna Access Token + Informações do Usuário Seguras (Sem a senha)
      return reply.send({
        accessToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (err: any) {
      if (err.message === 'INVALID_CREDENTIALS') {
        return reply.status(401).send({ error: 'UNAUTHORIZED', message: 'Credenciais incorretas' });
      }
      return reply.status(500).send({ error: 'INTERNAL_ERROR', message: 'Erro ao processar login' });
    }
  }

  async refresh(request: FastifyRequest, reply: FastifyReply) {
    const refreshToken = request.cookies.admin_refresh_token;

    if (!refreshToken) {
      return reply.status(401).send({ error: 'UNAUTHORIZED', message: 'Refresh token ausente' });
    }

    const userId = await authService.validateRefreshToken(refreshToken);
    if (!userId) {
      return reply.status(401).send({ error: 'UNAUTHORIZED', message: 'Refresh token inválido ou expirado' });
    }

    // Rotaciona (Revoga o atual e cria um novo)
    await authService.revokeRefreshToken(refreshToken);
    const newRefreshToken = await authService.generateRefreshToken(userId);

    // Na rotação precisamos resgatar o user do DB para o Role
    // Isso pode ser injetado/cacheado, mas por segurança batemos no DB
    const { prisma } = require('../../lib/prisma');
    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!user || !user.isActive) {
      return reply.status(401).send({ error: 'UNAUTHORIZED', message: 'Usuário inativo' });
    }

    const jti = randomUUID();
    const newAccessToken = await reply.jwtSign({
      id: user.id,
      role: user.role,
      jti
    });

    reply.setCookie('admin_refresh_token', newRefreshToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60
    });

    return reply.send({ accessToken: newAccessToken });
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    const refreshToken = request.cookies.admin_refresh_token;
    
    // 1. Revoga Refresh Token
    if (refreshToken) {
      await authService.revokeRefreshToken(refreshToken);
    }
    
    // 2. Apaga Cookie
    reply.clearCookie('admin_refresh_token', { path: '/' });

    // 3. Blacklist do Access Token ativo (se presente no header e válido)
    try {
      await request.jwtVerify(); // Verifica se o bearer enviou
      const payload = request.user as any;
      if (payload.jti && payload.exp) {
        const expiresInSecs = payload.exp - Math.floor(Date.now() / 1000);
        if (expiresInSecs > 0) {
          await authService.blacklistAccessToken(payload.jti, expiresInSecs);
        }
      }
    } catch (e) {
      // Ignora se não enviou JWT no logout
    }

    return reply.send({ success: true });
  }

  // Rota de Teste (RBAC)
  async me(request: FastifyRequest, reply: FastifyReply) {
    const payload = request.user;
    return reply.send({ user: payload });
  }
}

export const authController = new AuthController();
