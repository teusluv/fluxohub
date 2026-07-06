import { FastifyInstance } from 'fastify';
import { authController } from './auth.controller';
import { loginSchema } from './auth.schemas';

export async function authRoutes(server: FastifyInstance) {
  
  // POST /api/auth/login
  server.post('/login', {
    schema: {
      // Usar schema Zod no Fastify (requer validação pipe no servidor, ou simplificamos na rota)
      // Como não integramos fastify-zod plenamente no boilerplate, validamos no corpo manualmente ou usamos typeProvider.
      // Vamos assumir validação custom ou provider.
    }
  }, authController.login.bind(authController));

  // POST /api/auth/refresh
  server.post('/refresh', authController.refresh.bind(authController));

  // POST /api/auth/logout
  server.post('/logout', authController.logout.bind(authController));

  // GET /api/auth/me (Exemplo de rota protegida que requer no mínimo STORE_OWNER ou READONLY)
  server.get('/me', {
    preValidation: [server.requireAuth]
  }, authController.me.bind(authController));
}
