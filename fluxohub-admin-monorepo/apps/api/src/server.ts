import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import { securityPlugin } from './plugins/security.plugin';
import { authPlugin } from './plugins/auth.plugin';
import { authRoutes } from './modules/auth/auth.routes';
import { productRoutes } from './modules/products/product.routes';

const server = Fastify({
  logger: true,
});

async function main() {
  // 0. Borda de Segurança Base (Helmet, HSTS, CSP)
  await server.register(securityPlugin);

  // 1. CORS Seguro (Whitelist)
  await server.register(cors, {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://admin.fluxohub.com'] 
      : ['http://localhost:3000'],
    credentials: true,
  });

  // 2. Rate Limiting (Proteção contra Força Bruta e DDoS)
  await server.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // 3. Cookies para Refresh Token HttpOnly
  await server.register(cookie, {
    secret: process.env.COOKIE_SECRET || 'super-secret-cookie-signature-for-fluxohub-admin',
  });

  // 4. Plugin de Autenticação (JWT + Decorators RBAC)
  await server.register(authPlugin);

  // 5. Rotas
  await server.register(authRoutes, { prefix: '/api/auth' });
  await server.register(productRoutes, { prefix: '/api/products' });

  // 6. Health Check
  server.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  try {
    await server.listen({ port: 8080, host: '0.0.0.0' });
    console.log(`Server listening at http://localhost:8080`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();
