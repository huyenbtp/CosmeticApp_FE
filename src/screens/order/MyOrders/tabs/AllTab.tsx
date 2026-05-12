import { View, StyleSheet, FlatList } from "react-native";
import { Colors } from "../../../../theme/colors";
import { IOrder } from "../../../../types/order";
import OrderCard from "../../../../components/order/OrderCard";
import OrderList from "../../../../components/order/OrderList";

const mockOrders: IOrder[] = [
  {
    _id: "1",
    order_code: "ORD-2026-04-000011",
    total_items: 2,
    total_estimated: 349000,
    order_status: "pending",
    createdAt: "2026-04-01T09:30:00",
  },
  {
    _id: "2",
    order_code: "ORD-2025-12-009025",
    total_items: 3,
    total_estimated: 720000,
    order_status: "delivered",
    createdAt: "2025-12-20T09:30:00",
  },
  {
    _id: "3",
    order_code: "ORD-2025-02-001203",
    total_items: 1,
    total_estimated: 250000,
    order_status: "pending",
    createdAt: "2025-02-08T09:30:00",
  },
  {
    _id: "4",
    order_code: "ORD-2026-04-000011",
    total_items: 2,
    total_estimated: 349000,
    order_status: "pending",
    createdAt: "2026-04-01T09:30:00",
  },
  {
    _id: "5",
    order_code: "ORD-2025-12-009025",
    total_items: 3,
    total_estimated: 720000,
    order_status: "delivered",
    createdAt: "2025-12-20T09:30:00",
  },
  {
    _id: "6",
    order_code: "ORD-2025-02-001203",
    total_items: 1,
    total_estimated: 250000,
    order_status: "pending",
    createdAt: "2025-02-08T09:30:00",
  },
  {
    _id: "7",
    order_code: "ORD-2026-04-000011",
    total_items: 2,
    total_estimated: 349000,
    order_status: "pending",
    createdAt: "2026-04-01T09:30:00",
  },
  {
    _id: "8",
    order_code: "ORD-2025-12-009025",
    total_items: 3,
    total_estimated: 720000,
    order_status: "delivered",
    createdAt: "2025-12-20T09:30:00",
  },
  {
    _id: "9",
    order_code: "ORD-2025-02-001203",
    total_items: 1,
    total_estimated: 250000,
    order_status: "pending",
    createdAt: "2025-02-08T09:30:00",
  },
]

export default function AllTab() {

  return (
    <OrderList status="" />
  );
};
