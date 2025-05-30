export class AddressResponseDto {
  id: string;
  created_at: Date;
  updated_at: Date;
  city: string;
  district: string;
  street: string;
  number: number;
  cep: number;
  complement?: string;
  latitude: number;
  longitude: number;
}
