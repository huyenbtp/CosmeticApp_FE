export interface ICartItem {
  _id: string;
  product_id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
    status: string;
    available_stock: number;
  }
  quantity: number;
  createdAt: string;
  updatedAt: string;
}