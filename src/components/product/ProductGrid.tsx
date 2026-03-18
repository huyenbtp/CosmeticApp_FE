import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import ProductCard from "./ProductCard";
import { IProduct } from "../../types/product";

const { width } = Dimensions.get("window");

// tính width cho 2 cột
const COLUMN_GAP = 15;
const ITEM_WIDTH = (width - 25 * 2 - COLUMN_GAP) / 2;

export default function ProductGrid({ data }: { data: IProduct[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={{ width: ITEM_WIDTH }}>
          <ProductCard item={item} />
        </View>
      )}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 18,
  },
  row: {
    gap: COLUMN_GAP,
  },
});