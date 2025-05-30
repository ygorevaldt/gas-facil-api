import { z } from 'zod';

export const createAddressRequestBodyDto = z.object({
  user_id: z.string().min(1),
  session_id: z.string().min(1),
  city: z.string().min(1),
  district: z.string().min(1),
  street: z.string().min(1),
  number: z.number().int().positive(),
  cep: z.number().int().positive(),
  complement: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
});

export type CreateAddressRequestBodyDto = z.infer<
  typeof createAddressRequestBodyDto
>;
