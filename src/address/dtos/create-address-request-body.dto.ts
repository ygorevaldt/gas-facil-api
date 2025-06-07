import { z } from 'zod';

export const createAddressRequestBodyDto = z.object({
  user_id: z.string().min(1),
  session_id: z.string().min(1),
  city: z.string().optional(),
  district: z.string().optional(),
  street: z.string().optional(),
  number: z.coerce.number().int().positive().optional(),
  cep: z.coerce.number().int().positive().optional(),
  complement: z.string().optional(),
  reference: z.string().optional(),
  type: z.string().optional(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export type CreateAddressRequestBodyDto = z.infer<
  typeof createAddressRequestBodyDto
>;
