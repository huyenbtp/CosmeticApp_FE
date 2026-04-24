import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IOrder } from "../../types/order";
import { Colors } from "../../theme/colors";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function OrderCard({ item }: { item: IOrder }) {
  const navigation = useAppNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => { }}
    >
      <View style={styles.row}>
        <TouchableOpacity>
          <Feather name="box" size={24} />
        </TouchableOpacity>

        <View style={styles.info}>
          <Text numberOfLines={2} style={styles.title}>
            Order  #{item.order_code}
          </Text>

          <Text style={styles.price}>
            {item.total_estimated.toLocaleString()}₫ ({item.total_items} items)
          </Text>

        </View>
      </View>

      <Ionicons name="chevron-forward-outline" size={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.card,
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 6,
    overflow: "hidden",
    elevation: 1
  },
  info: {
    gap: 8
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  row: {
    flexDirection: 'row',
    alignItems: "center",
    gap: 20,
  },
  price: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  totalItem: {
    fontSize: 12,
    color: Colors.textSecondary,
  }
});