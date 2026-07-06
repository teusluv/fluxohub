import { prisma } from '../../lib/prisma';
import { CreateProductInput } from '@fluxohub/shared-schemas';
import sanitizeHtml from 'sanitize-html';

export class ProductService {
  /**
   * Cria um produto com suas Relações em Cascata em uma Transação.
   * Dispara o Audit Log após o commit.
   */
  async createProduct(data: CreateProductInput, userId: string, ip?: string, userAgent?: string) {
    // Escudo Anti-XSS (Sanitiza a descrição Rich Text impedindo scripts maliciosos injetados por bypass)
    const sanitizedDescription = sanitizeHtml(data.description, {
      allowedTags: [ 'b', 'i', 'em', 'strong', 'p', 'ul', 'li', 'br' ],
      allowedAttributes: {}
    });

    // Transação garantindo a inserção simultânea das tags, variações e imagens
    const createdProduct = await prisma.$transaction(async (tx) => {
      
      // 1. Inserir ou Conectar Tags
      const tagConnections = data.tags?.map(tagName => ({
        where: { name: tagName },
        create: { name: tagName }
      })) || [];

      // 2. Inserir o Produto
      const product = await tx.product.create({
        data: {
          name: data.name,
          sku: data.sku,
          description: sanitizedDescription,
          price: data.price,
          promoPrice: data.promoPrice,
          baseStock: data.baseStock,
          weightKg: data.weightKg,
          lengthCm: data.lengthCm,
          widthCm: data.widthCm,
          heightCm: data.heightCm,
          categoryId: data.categoryId,
          tags: {
            connectOrCreate: tagConnections
          },
          images: {
            create: data.images?.map(img => ({
              url: img.url,
              order: img.order
            })) || []
          },
          variations: {
            create: data.variations?.map(varItem => ({
              name: varItem.name,
              value: varItem.value,
              stock: varItem.stock,
              skuSuffix: varItem.skuSuffix
            })) || []
          }
        },
        include: {
          tags: true,
          images: true,
          variations: true,
          category: true
        }
      });

      // 3. Registrar o Log de Auditoria na mesma transação
      await tx.auditLog.create({
        data: {
          userId,
          action: 'CREATE_PRODUCT',
          entity: 'Product',
          entityId: product.id,
          beforeJson: null,
          afterJson: product as any, // Salvando snapshot imutável do momento da criação
          ip: ip || null,
          userAgent: userAgent || null
        }
      });

      return product;
    });

    return createdProduct;
  }
}

export const productService = new ProductService();
