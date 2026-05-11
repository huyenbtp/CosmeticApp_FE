import { View, FlatList, StyleSheet, } from "react-native";
import { IProduct } from "../../types/product";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ data }: { data: IProduct[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id
      }
      renderItem={({ item }) => (
        <View style={styles.item}>
          <ProductCard item={item} type="horizontal" />
        </View>
      )}
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingVertical: 10,
  },
  item: {
    width: 160,
    marginRight: 10,
  },
});