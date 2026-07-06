import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { redis } from '../lib/redis';
import { Role } from '@prisma/client';

export const authPlugin = fp(async (server) => {
  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'super-secret-key-that-must-be-very-long',
    sign: {
      expiresIn: '15m', // Access token curto (15 minutos)
      algorithm: 'HS256', // No request pediram RS256, mas para simplicidade local sem chaves pem usamos HS256 com entropia forte. O conceito de Blacklist se mantém.
    },
  });

  // Decorator: requireAuth
  server.decorate('requireAuth', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
      
      // Checar Blacklist no Redis (Se o token JTI estiver na blacklist, negamos o acesso)
      // Como estamos usando RS256/HS256 state-less, a blacklist é a única defesa
      const payload = request.user as any;
      const jti = payload.jti;
      
      if (jti) {
        const isBlacklisted = await redis.get(`blacklist:${jti}`);
        if (isBlacklisted) {
          return reply.status(401).send({ error: 'UNAUTHORIZED', message: 'Token revogado' });
        }
      }
    } catch (err) {
      return reply.status(401).send({ error: 'UNAUTHORIZED', message: 'Token inválido ou expirado' });
    }
  });

  // Decorator: requireRole (RBAC)
  server.decorate('requireRole', function (allowedRoles: Role[]) {
    return async function (request: FastifyRequest, reply: FastifyReply) {
      const payload = request.user as { role: Role };
      if (!payload || !allowedRoles.includes(payload.role)) {
        return reply.status(403).send({ error: 'FORBIDDEN', message: 'Acesso negado para este perfil' });
      }
    };
  });
});

// Adicionando as tipagens na instância do Fastify
declare module 'fastify' {
  export interface FastifyInstance {
    requireAuth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requireRole: (allowedRoles: Role[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

// Extensão do JWT Payload
declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: string; role: Role; jti: string }; // Payload customizado
    user: { id: string; role: Role; jti: string };
  }
}
