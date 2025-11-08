import { z } from 'zod';

export const updateSellerRequestBodyDto = z.object({
  id: z.string().min(1, 'O identificador do registro é obrigatório'),
  full_name: z.string().min(1, 'Nome completo é obrigatório').optional(),
  phone: z
    .string()
    .min(1, 'O telefone é obrigatório')
    .max(15, 'O telefone deve ser válido')
    .optional(),
  email: z.string().email('E-mail inválido').optional(),
  password: z
    .string()
    .min(8, 'A senha deve conter no mínimo 8 caracteres')
    .optional(),

  street: z.string().min(1, 'Rua é obrigatória').optional(),
  number: z.string().min(1, 'Número é obrigatório').optional(),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório').optional(),
  city: z.string().min(1, 'Cidade é obrigatória').optional(),
  state: z
    .string()
    .length(2, 'Estado deve conter 2 letras')
    .transform((val) => val.toUpperCase())
    .optional(),
  zip_code: z
    .string()
    .min(1, 'CEP é obrigatório')
    .max(8, 'Cep deve ser válido')
    .optional(),
  opening_hours: z
    .object({
      start: z.number().optional(),
      end: z.number().optional(),
    })
    .optional(),
});

export type UpdateSellerRequestBodyDto = z.infer<
  typeof updateSellerRequestBodyDto
>;
