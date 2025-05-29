import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  MONGO_URI: z.string(),
});

export type Env = z.infer<typeof envSchema>;
