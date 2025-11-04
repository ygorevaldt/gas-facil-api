import { z } from 'zod';

export const updateClientRequestBodyDto = z.object({
  user_id: z.string().min(1),
  bookmarks: z.string().array().optional(),
});

export type UpdateClientRequestBodyDto = z.infer<
  typeof updateClientRequestBodyDto
>;
