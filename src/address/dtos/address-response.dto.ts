export class AddressResponseDto {
  id: string;
  created_at: Date;
  updated_at: Date;
  city: string;
  district: string;
  street: string;
  number: number;
  type: string;
  cep: number;
  complement?: string;
  reference?: string;
  latitude: number;
  longitude: number;
}
