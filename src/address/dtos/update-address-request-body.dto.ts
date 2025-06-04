import { z } from 'zod';

export const updateAddressRequestBodyDto = z.object({
  user_id: z.string().min(1),
  session_id: z.string().min(1),
  city: z.string().min(1).optional(),
  district: z.string().min(1).optional(),
  street: z.string().min(1).optional(),
  number: z.number().int().positive().optional(),
  cep: z.number().int().positive().optional(),
  complement: z.string().optional(),
  referente: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  type: z.string(),
});

export type UpdateAddressRequestBodyDto = z.infer<
  typeof updateAddressRequestBodyDto
>;
