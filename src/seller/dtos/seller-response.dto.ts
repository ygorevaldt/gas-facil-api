export class SellerResponseDto {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  created_at: Date;
  updated_at: Date;
}
