import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Switch,
} from "react-native";
import { Colors } from "../../theme/colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { IOrderItem } from "../../types/orderItem";
import { IWriteReview } from "../../types/review";
import Header from "../../components/common/Header";
import WriteReviewCard from "../../components/review/WriteReviewCard";

type RouteProps = RouteProp<RootStackParamList, "WriteReview">;

export default function WriteReviewScreen() {
  const route = useRoute<RouteProps>();

  const {
    orderId,
    items,
  } = route.params;
  const [isPending, setIsPending] = useState(false);

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reviews, setReviews] = useState<IWriteReview[]>(
    items.map((item: IOrderItem) => ({
      product_id: item.product_id,
      rating: 5,
      comment: "",
    }))
  );

  const updateReview = (
    productId: string,
    field: keyof IWriteReview,
    value: string | number
  ) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.product_id === productId
          ? { ...review, [field]: value }
          : review
      )
    );
  };

  const handleSubmit = async () => {
    try {
      setIsPending(true);

      Alert.alert(
        "Thành công",
        "Cảm ơn bạn đã đánh giá sản phẩm."
      );
    } catch (error: any) {
      Alert.alert(
        "Lỗi",
        error?.message || "Không thể gửi đánh giá"
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Rate your order" />

      <FlatList
        data={items}
        keyExtractor={(item) => item.product_id}
        renderItem={({ item }) => {
          const review = reviews.find(
            (r) => r.product_id === item.product_id
          );

          if (!review) return null;

          return (
            <WriteReviewCard
              item={item}
              review={review}
              onReviewChange={updateReview}
            />
          );
        }}
        ListFooterComponent={
          <View style={styles.row}>
            <Switch
              value={isAnonymous}
              onValueChange={setIsAnonymous}
              thumbColor={Colors.secondary}
              trackColor={{ true: Colors.secondary300, false: Colors.bgDisabled }}
              disabled={isPending}
            />
            <Text style={styles.label}>Anonymous</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            isPending && styles.disabledButton,
          ]}
          disabled={isPending}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>
            {isPending
              ? "Sending..."
              : "Send"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  listContent: {
    marginTop: 8,
    paddingHorizontal: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },

  bottomBar: {
    marginTop: "auto",
    backgroundColor: Colors.background,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  submitButton: {
    height: 50,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});