import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IProduct } from "../../types/product";
import { Colors } from "../../theme/colors";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import StarRating from "../common/StarRating";

export default function ProductCard({ item }: { item: IProduct }) {
  const navigation = useAppNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.push("ProductInformation", { product_id: item._id })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <View style={styles.part}>
          <Text numberOfLines={2} style={styles.brand}>
            {item.brand?.toUpperCase()}
          </Text>

          <Text numberOfLines={2} style={styles.name}>
            {item.name}
          </Text>
        </View>

        <View style={styles.part}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6
          }}>
            <StarRating rating={item.rating} />
            <Text style={{ color: Colors.rating, fontWeight: 500, fontSize: 12 }}>
              {item.rating.toFixed(1)}
            </Text>
          </View>

          <Text style={styles.price}>
            {item.selling_price.toLocaleString()}₫
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: 310,
    gap: 12,
    padding: 6,
    borderRadius: 6,
    overflow: "hidden",
    elevation: 1
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 6,
    resizeMode: "cover",
  },
  info: {
    flex: 1,
    justifyContent: 'space-between'
  },
  part: {
    gap: 4,
  },
  brand: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.textSecondary
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