import { View, Text, Image, StyleSheet, } from "react-native";
import { Colors } from "../../theme/colors";
import { IReview } from "../../types/review";
import StarRating from "../common/StarRating";

export default function ReviewCard({ item }: { item: IReview }) {
  return (
    <View
      style={styles.container}
    >
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 6
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6
        }}>
          <Text style={styles.name}>
            {item.user_full_name}
          </Text>

          <StarRating rating={item.rating} />
        </View>

        <Text style={styles.date}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: "600",
  },
  date: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: "600",
  },
  comment: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
});