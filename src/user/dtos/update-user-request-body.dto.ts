import { z } from 'zod';

export const updateUserRequestBodyDto = z.object({
  user_id: z.string().min(1),
  bookmarks: z.string().array().optional(),
});

export type UpdateUserRequestBodyDto = z.infer<typeof updateUserRequestBodyDto>;
