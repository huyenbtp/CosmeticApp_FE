import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IOrder } from "../../types/order";
import { Colors } from "../../theme/colors";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { Feather, Ionicons } from "@expo/vector-icons";
import { capitalize } from "../../utils/capitalizeUtils";

export default function OrderCard({ item }: { item: IOrder }) {
  const navigation = useAppNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => { navigation.navigate("OrderInformation", { order_id: item._id }) }}
    >
      <View style={styles.infoContainer}>
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
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{capitalize(item.order_status)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: Colors.card,
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 6,
    overflow: "hidden",
    elevation: 1
  },
  badge: {
    backgroundColor: Colors.secondary,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: "flex-end"
  },
  badgeText: {
    color: Colors.textInverse,
    fontSize: 10,
    fontWeight: 500,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
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