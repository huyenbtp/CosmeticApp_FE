import { ActivityIndicator, FlatList, View } from "react-native";
import { IOrder } from "../../types/order";
import { Colors } from "../../theme/colors";
import OrderCard from "./OrderCard";
import { OrderStatusType } from "../../types/order";
import { useOrders } from "../../services/order.service";

export default function OrderList({ status }: { status: OrderStatusType }) {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useOrders(status);

  return (
    <FlatList
      data={data?.pages.flatMap(page => page.orders)}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 16,
        gap: 12,
      }}
      renderItem={({ item }) => (
        <OrderCard item={item} />
      )}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => {
        if (isFetchingNextPage) return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <ActivityIndicator size="small" />
          </ View>
        )
      }}
    />
  );
}