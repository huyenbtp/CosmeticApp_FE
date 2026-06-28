import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Colors } from "../../theme/colors";
import { IReview } from "../../types/review";
import { Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import ReviewCard from "../../components/review/ReviewCard";
import Header from "../../components/common/Header";
import { useProductReviews } from "../../services/review.service";

const mockReviews: IReview[] = [
  {
    _id: "1",
    user_full_name: "Sarah",
    rating: 5,
    comment: "love it",
    createdAt: "2026-03-15T09:30:00",
  },
  {
    _id: "2",
    user_full_name: "Selena Eva",
    rating: 5,
    comment: "high quality",
    createdAt: "2025-02-08T09:30:00",
  },
  {
    _id: "3",
    user_full_name: "Sarah",
    rating: 5,
    comment: "love it",
    createdAt: "2026-03-15T09:30:00",
  },
  {
    _id: "4",
    user_full_name: "Selena Eva",
    rating: 5,
    comment: "high quality",
    createdAt: "2025-02-08T09:30:00",
  },
  {
    _id: "11",
    user_full_name: "Sarah",
    rating: 5,
    comment: "love it",
    createdAt: "2026-03-15T09:30:00",
  },
  {
    _id: "12",
    user_full_name: "Selena Eva",
    rating: 5,
    comment: "high quality",
    createdAt: "2025-02-08T09:30:00",
  },
  {
    _id: "31",
    user_full_name: "Sarah",
    rating: 5,
    comment: "love it",
    createdAt: "2026-03-15T09:30:00",
  },
  {
    _id: "14",
    user_full_name: "Selena Eva",
    rating: 5,
    comment: "high quality",
    createdAt: "2025-02-08T09:30:00",
  },
]

export default function ReviewListScreen({route}: any) {
  const navigation = useAppNavigation();
  const { product_id: productId } = route.params;

  const { data = [], isLoading } = useProductReviews(productId);

  return (
    <View style={styles.container}>
      <Header title="All reviews" />

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ReviewCard item={item} key={item._id} />
        )}
        contentContainerStyle={styles.itemContainer}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>Chưa có đánh giá</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgSecondary,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 45,
    paddingBottom: 12,
    backgroundColor: Colors.background,
    gap: 18,
  },
  title: {
    fontWeight: 600,
    fontSize: 16,
  },

  itemContainer: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 24,
    gap: 24,
  },

  empty: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 280,
  }
});