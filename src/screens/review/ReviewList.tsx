import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Colors } from "../../theme/colors";
import { IReview } from "../../types/review";
import { Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import ReviewCard from "../../components/review/ReviewCard";

const mockReviews: IReview[] = [
  {
    _id: "1",
    username: "Sarah",
    rating: 5,
    comment: "love it",
    createdAt: "2026-03-15T09:30:00",
  },
  {
    _id: "2",
    username: "Selena Eva",
    rating: 5,
    comment: "high quality",
    createdAt: "2025-02-08T09:30:00",
  },
]

export default function ReviewListScreen() {
  const navigation = useAppNavigation();

  const data = mockReviews;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>All reviews</Text>
      </View>

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
    backgroundColor: Colors.surface,
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
    paddingBottom: 80,
    gap: 24,
  },

  empty: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 280,
  }
});