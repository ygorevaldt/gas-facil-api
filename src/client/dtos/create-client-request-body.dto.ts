import { z } from 'zod';

export const createClientRequestBodyDto = z.object({
  session_id: z.string().min(1),
});

export type CreateClientRequestBodyDto = z.infer<
  typeof createClientRequestBodyDto
>;
