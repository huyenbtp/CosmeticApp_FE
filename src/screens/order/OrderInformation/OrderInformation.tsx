import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from "react-native";
import { Colors } from "../../../theme/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../../navigation/useAppNavigation";
import Header from "../../../components/common/Header";
import { IOrderDetail } from "../../../types/order";
import ItemCard from "../../../components/order/OrderItemCard";

const mockData: IOrderDetail = {
  _id: "ORD-001",
  order_code: "ORD-2025-000001",
  items: [
    {
      _id: "1",
      order_id: "1",
      product_id: "1",
      product: {
        _id: "1",
        name: "Kem Chống Nắng Cho Da Nhạy Cảm Skin1004 Madagascar Centella Air-Fit Suncream Plus Spf50+ Pa++++ 50Ml",
        sku: "SUN-SKI-0001",
        image: "https://picsum.photos/200/200?random=1",
      },
      unit_price: 480000,
      quantity: 1,
    },
    {
      _id: "2",
      order_id: "1",
      product_id: "2",
      product: {
        _id: "2",
        name: "Sữa rửa mặt Innisfree Green Tea",
        sku: "CLS-INN-0001",
        image: "https://picsum.photos/200/200?random=2",
      },
      unit_price: 210000,
      quantity: 1,
    },
    {
      _id: "3",
      order_id: "1",
      product_id: "3",
      product: {
        _id: "3",
        name: "Tinh Chất Dưỡng Ẩm Torriden Dive-In Serum 50ml",
        sku: "MAK-TOR-0003",
        image: "https://picsum.photos/200/200?random=3",
      },
      unit_price: 295000,
      quantity: 1,
    }
  ],
  total_items: 3,
  subtotal: 985000,
  discount_amount: 98500,
  total_estimated: 876500,
  payment_method: "COD",
  payment_status: "paid",
  order_status: "delivered",
  note: "",

  receiver_name: "Huyen Bui",
  phone: "0987654321",
  address_line: "Trường ĐH Công nghệ thông tin, Đường Hàn Thuyên",
  ward: "Phường Linh Xuân",
  district: "Quận Thủ Đức",
  city: "Tp. Hồ Chí Minh",

  reveive_time: "2025-11-15T09:30:00",

  createdAt: "2025-11-15T09:30:00",
  updatedAt: "2025-11-15T09:30:00",
};

const getOrderStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "Waiting for confirmation"
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

export default function OrderInformationScreen({ navigation, route }: any) {
  const { order_id } = route.params;

  const data = mockData;

  return (
    <ScrollView style={styles.container}>
      <View>
        <Header title="Order Information" />

        <View style={[styles.statusContainer, styles.row]}>
          <Text style={styles.text600}>{getOrderStatus(data.order_status)}</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.rowBetween, styles.divider]}
            onPress={() => navigation.navigate("ShippingInformation", { order_id: order_id })}
          >
            <Text style={styles.text600}>Shipping Information</Text>
            <Feather name="chevron-right" size={20} style={styles.buttonText} />
          </TouchableOpacity>

          <View style={styles.row}>
            <Feather name="map-pin" size={16} />
            <Text style={styles.sectionTitle}>Shipping Address</Text>
          </View>

          <View style={{ gap: 6, paddingLeft: 16, }}>
            <Text style={[styles.text500]}>{data.receiver_name} - {data.phone}</Text>
            <Text style={styles.text400}>
              {data.address_line}, {data.ward}, {data.district}, {data.city}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items List</Text>

          {data.items.map(item => (
            <View key={item._id} style={styles.divider}>
              <ItemCard item={item} />
            </View>
          ))}

          <View style={{ gap: 14 }}>
            <View style={styles.rowBetween}>
              <Text style={styles.text400}>
                Subtotal ({data.total_items} item)
              </Text>
              <Text style={styles.text400}>
                {data.total_estimated.toLocaleString()}₫
              </Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.text400}>
                Discount
              </Text>
              <Text style={[styles.text400, { color: Colors.textError }]}>
                -{data.discount_amount.toLocaleString()}₫
              </Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.text500}>
                Total
              </Text>
              <Text style={styles.text500}>
                {data.total_estimated.toLocaleString()}₫
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Order Code</Text>
            <Text>{data.order_code}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.text400}>Payment method</Text>
            <Text style={styles.text400}>{data.payment_method}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.text400}>Order time</Text>
            <Text style={styles.text400}>{new Date(data.createdAt).toLocaleString()}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.text400}>Completion time</Text>
            <Text style={styles.text400}>{new Date(data.reveive_time).toLocaleString()}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgSecondary,
  },

  statusContainer: {
    padding: 18,
    backgroundColor: Colors.secondary100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  section: {
    backgroundColor: Colors.card,
    padding: 18,
    marginBottom: 12,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 600,
  },

  divider: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: Colors.divider,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text400: {
    fontWeight: 400,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  text500: {
    fontWeight: 500,
  },
  text600: {
    fontSize: 15,
    fontWeight: 600,
  },

  button: {
    backgroundColor: Colors.card,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    gap: 16,
    margin: 4,
  },
  buttonText: {
    color: Colors.primary500
  }
});