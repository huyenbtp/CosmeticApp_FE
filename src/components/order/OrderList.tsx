import { FlatList } from "react-native";
import { IOrder } from "../../types/order";
import { Colors } from "../../theme/colors";
import OrderCard from "./OrderCard";

export default function OrderList({ data }: { data: IOrder[] }) {

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <OrderCard item={item} />
      )}
    />
  );
}