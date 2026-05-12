import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator, } from "react-native";
import { Colors } from "../../theme/colors";
import ProductCard from "../../components/product/ProductCard";
import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useRemoveFromWishlist, useWishlistItems } from "../../services/wishlist.service";
import { useQueryClient } from "@tanstack/react-query";

const { width } = Dimensions.get("window");
const COLUMN_GAP = 10;
const PADDING_HORIZONTAL = 14;
const ITEM_WIDTH = (width - PADDING_HORIZONTAL * 2 - COLUMN_GAP) / 2;

export default function WishlistScreen() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useWishlistItems();

  useEffect(() => {

  }, []);

  const removeMutate = useRemoveFromWishlist();

  const handleUnlike = (product_id: string) => {
    removeMutate.mutate(
      product_id,
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["wishlist-items"],
          });
        }
      }
    );
  };

  const renderEmpty = () => {
    return (
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <Text style={{ color: Colors.textSecondary }}>
          Nothing here
        </Text>
      </View>
    )
  }

  if (isLoading) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
  return (
    <View style={styles.container}>
      <Header title="Wishlist" hasCart />

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ width: ITEM_WIDTH }}>
            <ProductCard
              item={item}
              type="wishlist_item"
              onUnlike={() => handleUnlike(item._id)}
            />
          </View>
        )}
        contentContainerStyle={styles.productsContainer}
        columnWrapperStyle={styles.productsRow}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgSecondary,
  },

  productsContainer: {
    paddingTop: 12,
  },
  productsRow: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: COLUMN_GAP,
    gap: COLUMN_GAP,
  },
  item: {
    width: ITEM_WIDTH,
  },
});