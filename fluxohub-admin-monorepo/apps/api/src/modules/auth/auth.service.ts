import { prisma } from '../../lib/prisma';
import { redis } from '../../lib/redis';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { LoginInput } from './auth.schemas';

export class AuthService {
  // 1. Validar login e aplicar Argon2id
  async validateLogin(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email }
    });

    if (!user || !user.isActive) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const isValid = await argon2.verify(user.password, input.password);
    if (!isValid) {
      throw new Error('INVALID_CREDENTIALS');
    }

    return user;
  }

  // 2. Gerar Refresh Token Opaco e guardar no Redis
  async generateRefreshToken(userId: string): Promise<string> {
    const refreshToken = randomBytes(40).toString('hex');
    
    // Armazena no Redis associado ao usuário, com TTL de 7 dias
    // (7 * 24 * 60 * 60 = 604800 segundos)
    await redis.set(`refresh:${refreshToken}`, userId, 'EX', 604800);
    
    return refreshToken;
  }

  // 3. Validar Refresh Token
  async validateRefreshToken(token: string): Promise<string | null> {
    const userId = await redis.get(`refresh:${token}`);
    return userId;
  }

  // 4. Revogar (Logout)
  async revokeRefreshToken(token: string) {
    await redis.del(`refresh:${token}`);
  }

  // 5. Adicionar Access Token comprometido na Blacklist (quando o usuário faz logout)
  async blacklistAccessToken(jti: string, expiresInSeconds: number) {
    await redis.set(`blacklist:${jti}`, 'true', 'EX', expiresInSeconds);
  }
}

export const authService = new AuthService();
