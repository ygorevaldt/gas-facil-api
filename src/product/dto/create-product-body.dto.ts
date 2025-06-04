import { z } from 'zod';

export const createProductRequestBodyDto = z.object({
  name: z.string().min(2),
  seller: z.object({
    name: z.string().min(1),
    phone: z.string().min(8),
    opening_hours: z.object({
      start: z.number().positive(),
      end: z.number().positive(),
    }),
  }),
  price: z.coerce.number(),
  note: z.coerce.number().default(0),
});

export type CreateProductRequestBodyDto = z.infer<
  typeof createProductRequestBodyDto
>;
