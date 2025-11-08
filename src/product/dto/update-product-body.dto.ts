import { z } from 'zod';

export const updateProductRequestBodyDto = z.object({
  id: z.string().min(1),
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  note: z.coerce.number().optional(),
  sum_note: z.coerce.number().optional(),
  amount_notes: z.coerce.number().optional(),
});

export type UpdateProductRequestBodyDto = z.infer<
  typeof updateProductRequestBodyDto
>;
