import { z } from 'zod';

export const createUserRequestBodyDto = z.object({
  session_id: z.string().min(1),
});

export type CreateUserRequestBodyDto = z.infer<typeof createUserRequestBodyDto>;
