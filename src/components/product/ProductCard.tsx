import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IProduct } from "../../types/product";
import { Colors } from "../../theme/colors";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import StarRating from "../common/StarRating";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function ProductCard({
  item,
  type = "default",
  onUnlike,
}: {
  item: IProduct;
  type?: "default" | "horizontal" | "view_history_item" | "wishlist_item";
  onUnlike?: () => void
}) {
  const navigation = useAppNavigation();

  const handleSelect = () => {
    navigation.push(
      "ProductInformation",
      { product_id: item._id }
    )
  }
  if (type === "horizontal") return (
    <TouchableOpacity
      style={[styles.container, { height: 250 }]}
      onPress={() => handleSelect()}
    >
      <View>
        <Image
          source={{ uri: item.image || undefined }}
          style={[styles.image, { height: 150 }]}
        />
      </View>

      <View style={[styles.info,]}>
        <View style={styles.part}>
          <Text
            numberOfLines={1}
            style={[styles.name,]}
          >
            {item.name}
          </Text>
          <Text style={styles.price}>
            {item.selling_price.toLocaleString()}₫
          </Text>
        </View>

        <View style={styles.part}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            marginRight: "auto",
            paddingVertical: 0.5,
            paddingHorizontal: 5,
            backgroundColor: Colors.bgWarning1,
            borderColor: Colors.rating,
            borderWidth: 0.5,
          }}>
            <Ionicons
              name="star"
              size={12}
              color={Colors.rating}
            />
            <Text style={{ fontWeight: 400, fontSize: 10 }}>
              {item.avg_rating.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <TouchableOpacity
      style={[
        styles.container,
        type == "view_history_item" && { padding: 0, height: 270, gap: 0 },
        type == "wishlist_item" && { padding: 0, height: 270, gap: 0 }
      ]}
      onPress={() => navigation.push(
        "ProductInformation",
        { product_id: item._id }
      )}
    >
      <View>
        <Image
          source={{ uri: item.image || undefined }}
          style={[
            styles.image,
            type !== "default" && { height: 180, borderRadius: 0 }
          ]}
        />

        {type == "wishlist_item" && onUnlike && (
          <TouchableOpacity
            style={styles.unlikeButton}
            onPress={onUnlike}
          >
            <Ionicons name="heart" color={Colors.heart} size={22} />
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.info, type !== "default" && { padding: 6 }]}>
        <View style={styles.part}>
          {type === "default" && (
            <Text
              numberOfLines={2}
              style={styles.brand}
            >
              {item.brand?.toUpperCase()}
            </Text>
          )}

          <Text
            numberOfLines={2}
            style={[
              styles.name,
              type !== "default" && { fontSize: 13, fontWeight: 400 }
            ]}
          >
            {item.name}
          </Text>
        </View>

        <View style={styles.part}>
          {type === "default" && (
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6
            }}>
              <StarRating rating={item.avg_rating} />
              <Text style={{ color: Colors.rating, fontWeight: 500, fontSize: 12 }}>
                {item.avg_rating.toFixed(1)}
              </Text>
            </View>
          )}

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
    backgroundColor: Colors.card,
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

  unlikeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 3,
    borderRadius: 30,
  }
});