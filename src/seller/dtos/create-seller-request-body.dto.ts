import { z } from 'zod';

export const createSellerRequestBodyDto = z.object({
  full_name: z.string().min(1, 'Nome completo é obrigatório'),
  phone: z
    .string()
    .regex(
      /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
      'Telefone inválido — formato esperado: (11) 98765-4321',
    ),
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
    .regex(/^\d{5}-\d{3}$/, 'CEP inválido — formato esperado: 00000-000'),
});

export type CreateSellerRequestBodyDto = z.infer<
  typeof createSellerRequestBodyDto
>;
