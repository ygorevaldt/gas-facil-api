import { z } from 'zod';

export const createAddressRequestBodyDto = z.object({
  user_id: z.string().min(1),
  session_id: z.string().min(1),
  city: z.string().min(1),
  district: z.string().optional(),
  street: z.string().optional(),
  number: z.number().int().positive(),
  cep: z.number().int().positive(),
  complement: z.string().optional(),
  reference: z.string().optional(),
  type: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export type CreateAddressRequestBodyDto = z.infer<
  typeof createAddressRequestBodyDto
>;
