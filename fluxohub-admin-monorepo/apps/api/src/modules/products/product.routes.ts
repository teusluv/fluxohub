import { FastifyInstance } from 'fastify';
import { productController } from './product.controller';

export async function productRoutes(server: FastifyInstance) {
  
  // POST /api/products
  // Protegido: Apenas quem está logado (requireAuth) e tem cargo STORE_OWNER (requireRole) pode criar.
  server.post('/', {
    preValidation: [
      server.requireAuth,
      server.requireRole(['STORE_OWNER', 'SUPER_ADMIN'])
    ]
  }, productController.create.bind(productController));

}
