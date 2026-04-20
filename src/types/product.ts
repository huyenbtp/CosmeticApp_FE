export interface IProduct {
  _id: string;
  name: string;
  selling_price: number;
  image: string;
  rating: number;
  brand?: string;
}