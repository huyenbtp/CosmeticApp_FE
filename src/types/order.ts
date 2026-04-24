export interface IOrder {
  _id: string;
  order_code: string;
  total_items: number;
  total_estimated: number;
  order_status: string;
  createdAt: string;
}