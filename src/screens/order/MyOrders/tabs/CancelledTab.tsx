import { View, StyleSheet, FlatList } from "react-native";
import { Colors } from "../../../../theme/colors";
import { IOrder } from "../../../../types/order";
import OrderCard from "../../../../components/order/OrderCard";
import OrderList from "../../../../components/order/OrderList";

const mockOrders: IOrder[] = [
  {
    _id: "1",
    order_code: "ORD-2026-04-000001",
    total_items: 2,
    total_estimated: 349000,
    order_status: "cancelled",
    createdAt: "2025-02-08T09:30:00",
  }
]

export default function CancelledTab() {
  let data: IOrder[] = mockOrders;

  return (
    <OrderList data={data} />
  );
};
