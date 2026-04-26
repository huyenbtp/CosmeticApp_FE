import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { IOrderStatusHistory } from "../../../types/orderStatusHistory";
import { Colors } from "../../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../../components/common/Header";
import dayjs from "dayjs";

const mockData: IOrderStatusHistory[] = [
  {
    _id: "1",
    order_id: "123",
    status: "pending",
    updatedBy: "system",
    updatedAt: "2024-04-01T10:00:00Z",
  },
  {
    _id: "2",
    order_id: "123",
    status: "confirmed",
    updatedBy: "admin",
    updatedAt: "2024-04-01T10:10:00Z",
  },
  {
    _id: "3",
    order_id: "123",
    status: "shipping",
    updatedBy: "admin",
    updatedAt: "2024-04-02T00:10:00Z",
  },
  {
    _id: "4",
    order_id: "123",
    status: "delivered",
    updatedBy: "system",
    updatedAt: "2024-04-04T05:00:00Z",
  },
];


export const getOrderStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "The order has been placed"
    case "confirmed":
      return "The order has been confirmed"
    case "shipping":
      return "The order is being shipped"
    case "delivered":
      return "The order has been delivered"
    case "canceled":
      return "The order has been cancelled"
    case "returned":
      return "The order has been returned"
  }
}

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return "time-outline";
    case "confirmed":
      return "checkmark-circle-outline";
    case "shipping":
      return "car-outline";
    case "delivered":
      return "cube-outline";
    case "cancelled":
      return "close-circle-outline";
    case "returned":
      return "refresh-circle-outline";
    default:
      return "ellipse-outline";
  }
};

export const getStatusColor = (latest: boolean) => {
  return latest ? Colors.text : Colors.textLight;
};

export default function ShippingInformationScreen() {
  const data = [...mockData].reverse(); // mới nhất lên trên

  const formatDate = (date: string) => {
    return dayjs(date).format("DD/MM HH:mm");
  };

  const renderItem = ({ item, index, }: { item: IOrderStatusHistory; index: number; }) => {
    const isLatest = index === 0;

    return (
      <View style={styles.item}>

        {/* Time */}
        <Text style={[
          styles.time,
          { color: getStatusColor(isLatest) },
        ]}>
          {formatDate(item.updatedAt)}
        </Text>

        {/* Timeline dot */}
        <View style={styles.timeline}>
          <View
            style={[
              styles.dot,
              { backgroundColor: getStatusColor(isLatest) },
            ]}
          />
          {index !== data.length - 1 && <View style={styles.line} />}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text
            style={[
              styles.status,
              isLatest && { color: Colors.textSuccess1 },
            ]}
          >
            {getOrderStatus(item.status)}
          </Text>
        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Shipping Information" />

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.itemContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  itemContainer: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },

  item: {
    backgroundColor: Colors.card,
    flexDirection: "row",
    gap: 8,
    height: 72
  },
  
  time: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 3,
  },

  timeline: {
    width: 30,
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.divider,
    marginTop: 6,
  },

  content: {
    flex: 1,
  },
  status: {
    fontWeight: "400",
    fontSize: 14,
    color: Colors.textLight,
  },
});