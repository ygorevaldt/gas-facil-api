import { z } from 'zod';

export const createSellerRequestBodyDto = z.object({
  full_name: z.string().min(1, 'Nome completo é obrigatório'),
  phone: z
    .string()
    .min(1, 'O telefone é obrigatório')
    .max(15, 'O telefone deve ser válido'),

  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve conter no mínimo 8 caracteres'),

  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z
    .string()
    .length(2, 'Estado deve conter 2 letras')
    .transform((val) => val.toUpperCase()),
  zip_code: z
    .string()
    .min(1, 'CEP é obrigatório')
    .max(8, 'Cep deve ser válido'),
  opening_hours: z.object({
    start: z.number(),
    end: z.number(),
  }),
});

export type CreateSellerRequestBodyDto = z.infer<
  typeof createSellerRequestBodyDto
>;
