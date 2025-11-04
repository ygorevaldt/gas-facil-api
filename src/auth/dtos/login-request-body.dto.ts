import { z } from 'zod';

export const loginRequestBodyDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginRequestBodyDto = z.infer<typeof loginRequestBodyDto>;
