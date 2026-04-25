import { IOrderItem } from "./orderItem";

export interface IOrder {
  _id: string;
  order_code: string;
  total_items: number;
  total_estimated: number;
  order_status: string;
  createdAt: string;
}

export interface IOrderDetail {
  _id: string;
  order_code: string;

  items: IOrderItem[];
  total_items: number;
  subtotal: number;
  discount_amount: number;
  total_estimated: number;

  payment_method: string;
  payment_status: string;
  order_status: string;
  note: string;

  receiver_name: string;
  phone: string;
  address_line: string;
  ward: string;
  district: string;
  city: string;

  reveive_time: string;

  createdAt: string;
  updatedAt: string;
}