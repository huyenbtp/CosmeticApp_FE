import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, } from "react-native";
import { Colors } from "../../theme/colors";
import { IOrderItem } from "../../types/orderItem";
import { IWriteReview } from "../../types/review";
import { Ionicons } from "@expo/vector-icons";

export default function WriteReviewCard({
  item,
  review,
  onReviewChange,
}: {
  item: IOrderItem;
  review: IWriteReview;
  onReviewChange: (
    productId: string,
    field: keyof IWriteReview,
    value: string | number
  ) => void,
}) {

  const renderStars = (
    productId: string,
    currentRating: number,
  ) => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() =>
              onReviewChange(productId, "rating", star)
            }
          >
            <Ionicons
              name="star"
              size={24}
              style={[
                styles.star,
                star <= currentRating && styles.activeStar,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.productRow}>
        <Image
          source={{ uri: item.product.image || undefined }}
          style={styles.imagePlaceholder}
        />

        <View style={styles.productInfo}>
          <Text numberOfLines={2} style={styles.productName}>
            {item.product.name}
          </Text>

          <Text style={styles.productMeta}>
            x{item.quantity}
          </Text>
        </View>
      </View>

      <Text style={styles.label}>
        Product quality
      </Text>

      {renderStars(
        item.product_id,
        review.rating
      )}

      <TextInput
        style={styles.commentInput}
        placeholder="Please share your thoughts on the product..."
        multiline
        maxLength={255}
        textAlignVertical="top"
        value={review.comment}
        onChangeText={(text) =>
          onReviewChange(
            item.product_id,
            "comment",
            text
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    marginBottom: 20,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border
  },

  productRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: "#eee",
  },

  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },

  productName: {
    fontSize: 14,
    fontWeight: "600",
  },

  productMeta: {
    fontSize: 12,
    marginTop: 4,
    color: Colors.textLight,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
  },

  starContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },

  star: {
    color: "#DADADA",
    marginRight: 8,
  },
  activeStar: {
    color: Colors.rating,
  },

  commentInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: Colors.bgSecondary,
  },

});