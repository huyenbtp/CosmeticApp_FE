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
          <ProductCard item={item} />
        </View>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    width: 160,
    marginRight: 15,
  },
});