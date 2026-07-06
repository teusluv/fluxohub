import fp from 'fastify-plugin';
import helmet from '@fastify/helmet';

export const securityPlugin = fp(async (server) => {
  // 1. Injeta os headers de segurança base (HSTS, NoSniff, XSS-Protection)
  await server.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"], // Liberado restritamente por necessidade
        imgSrc: ["'self'", "data:", "https://*"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    xFrameOptions: { action: "deny" }, // Impede Clickjacking fatal
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  });

  // 2. HTTPS Enforcer Middleware (Interceptador que redireciona HTTP para HTTPS em prod)
  server.addHook('onRequest', async (request, reply) => {
    if (process.env.NODE_ENV === 'production') {
      const forwardedProto = request.headers['x-forwarded-proto'];
      // Se tiver proxy reverso informando que bateu em porta 80 insegura
      if (forwardedProto && forwardedProto !== 'https') {
        const url = `https://${request.headers.host}${request.url}`;
        return reply.redirect(301, url);
      }
    }
  });
});
