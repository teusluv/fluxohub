import { z } from 'zod';

// Esquema para imagem de produto
export const productImageSchema = z.object({
  url: z.string().url("A URL da imagem é inválida"),
  order: z.number().int().nonnegative().default(0),
});

// Esquema para Variações do produto (Cor, Tamanho)
export const productVariationSchema = z.object({
  name: z.string().min(1, "O nome da variação é obrigatório (ex: Cor)"),
  value: z.string().min(1, "O valor é obrigatório (ex: Azul)"),
  stock: z.number().int().nonnegative("Estoque não pode ser negativo").default(0),
  skuSuffix: z.string().optional(),
});

// Criação de Produto (Template Core)
export const createProductSchema = z.object({
  name: z.string().min(3, "O nome do produto deve ter pelo menos 3 caracteres").max(100),
  sku: z.string().min(3, "SKU obrigatório"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  price: z.number().positive("Preço deve ser maior que zero"),
  promoPrice: z.number().positive("O preço promocional deve ser positivo").optional().nullable(),
  baseStock: z.number().int().nonnegative("O estoque não pode ser negativo").default(0),
  
  weightKg: z.number().positive("O peso deve ser positivo"),
  lengthCm: z.number().positive("O comprimento deve ser positivo"),
  widthCm: z.number().positive("A largura deve ser positiva"),
  heightCm: z.number().positive("A altura deve ser positiva"),
  
  categoryId: z.string().uuid("A Categoria é inválida ou inexistente"),
  
  // Relações em Cascata
  tags: z.array(z.string().min(1)).optional(),
  images: z.array(productImageSchema).optional(),
  variations: z.array(productVariationSchema).optional()
});

// Tipos Inferidos Universais
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type ProductImageInput = z.infer<typeof productImageSchema>;
export type ProductVariationInput = z.infer<typeof productVariationSchema>;
