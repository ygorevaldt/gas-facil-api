import { z } from 'zod';

export const createProductRequestBodyDto = z.object({
  name: z.string().min(2),
  seller: z.string().min(3),
  price: z.coerce.number(),
  note: z.coerce.number().default(0),
});

export type CreateProductRequestBodyDto = z.infer<
  typeof createProductRequestBodyDto
>;
