export interface IOrderItem {
  product_id: string;
  product: {
    _id: string;
    name: string;
    image: string;
  }
  quantity: number;
  unit_price: number;
}

export interface IAddEditOrderItem {
  product_id: string;
  quantity: number;
  unit_price: number;
}