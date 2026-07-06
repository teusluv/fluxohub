import { FastifyReply, FastifyRequest } from 'fastify';
import { productService } from './product.service';
import { createProductSchema, CreateProductInput } from '@fluxohub/shared-schemas';

export class ProductController {
  
  async create(request: FastifyRequest<{ Body: CreateProductInput }>, reply: FastifyReply) {
    try {
      // 1. Validação estrita usando o Zod (Shared Schema)
      const parsedData = createProductSchema.parse(request.body);
      
      // 2. Extração de Identidade e Metadados para o Audit Trail
      const payload = request.user as { id: string, role: string };
      const ip = request.ip;
      const userAgent = request.headers['user-agent'];

      // 3. Execução
      const product = await productService.createProduct(parsedData, payload.id, ip, userAgent);

      return reply.status(201).send({ success: true, data: product });
      
    } catch (err: any) {
      if (err.name === 'ZodError') {
        // Erro de schema malformado
        return reply.status(400).send({ error: 'BAD_REQUEST', issues: err.issues });
      }
      
      // Pega erros do Prisma, como Unique Constraint violation no SKU
      if (err.code === 'P2002') {
         return reply.status(409).send({ error: 'CONFLICT', message: 'Este SKU já está em uso.' });
      }

      console.error(err);
      return reply.status(500).send({ error: 'INTERNAL_ERROR', message: 'Falha ao criar o produto' });
    }
  }

}

export const productController = new ProductController();
