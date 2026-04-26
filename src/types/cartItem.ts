export interface ICartItem {
  _id: string;
  product_id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  }
  quantity: number;
  createdAt: string;
  updatedAt: string;
}