import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../theme/colors";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { IOrderItem } from "../../types/orderItem";

export default function ItemCard({ item }: { item: IOrderItem }) {
  const navigation = useAppNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ProductInformation", { product_id: item._id })}
    >
        <Image source={{ uri: item.product.image }} style={styles.imagePlaceholder} />

        <View style={styles.infoContainer}>
          <Text numberOfLines={2} style={styles.name}>{item.product.name}</Text>

          <View style={styles.row}>
            <Text style={styles.price}>{(item.unit_price).toLocaleString()}₫</Text>
            <Text style={styles.qty}>Quantity: {item.quantity}</Text>
          </View>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    height: 87,
    gap: 12,
    padding: 6,
    borderRadius: 6,
    overflow: "hidden",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },

  imagePlaceholder: {
    width: 75,
    height: 75,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 12,
    fontWeight: "400",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  qty: {
    fontSize: 13,
    fontWeight: "500",
  },
  price: {
    fontSize: 13,
    fontWeight: "500",
  },
});