import { Seller } from '../schemas';

export class ProductResponseDto {
  id: string;
  name: string;
  seller: ProductResponseSeller;
  price: number;
  note: number;
  sum_note: number;
  amount_notes: number;
  created_at: Date;
  updated_at: Date;
}

type ProductResponseSeller = {
  name: string;
  phone: string;
  opening_hours: {
    start: number;
    end: number;
  };
};
