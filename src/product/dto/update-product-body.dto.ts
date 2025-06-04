import { z } from 'zod';

export const updateProductRequestBodyDto = z.object({
  name: z.string().min(2).optional(),
  seller: z
    .object({
      name: z.string().min(1).optional(),
      phone: z.string().min(8).optional(),
      opening_hours: z
        .object({
          start: z.number().positive().optional(),
          end: z.number().positive().optional(),
        })
        .optional(),
    })
    .optional(),
  price: z.coerce.number().optional(),
  note: z.coerce.number().optional(),
  sum_note: z.coerce.number().optional(),
  amount_notes: z.coerce.number().optional(),
});

export type UpdateProductRequestBodyDto = z.infer<
  typeof updateProductRequestBodyDto
>;
