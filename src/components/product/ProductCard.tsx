import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IProduct } from "../../types/product";
import { Colors } from "../../theme/colors";

export default function ProductCard({ item }: { item: IProduct }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.price}>
          {item.selling_price.toLocaleString()} đ
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 15,
    resizeMode: "cover",
  },
  info: {
    gap: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
});