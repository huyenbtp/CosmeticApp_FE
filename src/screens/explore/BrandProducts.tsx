import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ActivityIndicator, } from "react-native";
import { Colors } from "../../theme/colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import ProductCard from "../../components/product/ProductCard";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { useEffect, useState } from "react";
import { NullFilter } from "./FilterScreen";
import SortModal, { SortType } from "../../components/common/SortModal";
import Header from "../../components/common/Header";
import { useProductFilters, useProducts } from "../../services/product.service";

const { width } = Dimensions.get("window");
const COLUMN_GAP = 12;
const PADDING_HORIZONTAL = 14;
const ITEM_WIDTH = (width - PADDING_HORIZONTAL * 2 - COLUMN_GAP) / 2;

const mockBrand = {
  _id: "64f1a2b3che123114",
  name: "Maybelline",
  logo: "https://picsum.photos/200/200?random=5",
  status: "active",
};

export default function BrandProductsScreen({ route }: any) {
  const { brand_id, brand_name } = route.params;
  const navigation = useAppNavigation();
  const [openSort, setOpenSort] = useState(false);

  const [sortBy, setSortBy] = useState<SortType>("none");
  const [filter, setFilter] = useState(NullFilter);

  const {
    data: initialFilter
  } = useProductFilters({ brand_id });

  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts(
    {
      brand_id,
      ...filter
    },
    { enabled: !!initialFilter }
  );

  useEffect(() => {
    if (!initialFilter) return;
    setFilter(prev => ({
      ...prev,
      minPrice: initialFilter.minPrice,
      maxPrice: initialFilter.maxPrice,
    }))
  }, [initialFilter]);

  useEffect(() => {
    refetch()
    console.log("filter: " + filter.minPrice + ", " + filter.tags)
  }, [filter]);

  const isFilterApply =
    filter.minPrice !== NullFilter.minPrice ||
    filter.maxPrice !== NullFilter.maxPrice ||
    filter.skinTypes.length > 0 ||
    filter.tags.length > 0;

  return (
    <View style={styles.container}>
      <Header title={brand_name} hasCart />

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setOpenSort(true)}
        >
          <FontAwesome5 name="sort-alpha-up-alt" size={14} style={sortBy !== "none" ? styles.activeFilter : styles.inactiveFilter} />
          <Text style={[styles.filterText, sortBy !== "none" ? styles.activeFilter : styles.inactiveFilter]}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate("Filter", {
            initialFilter,
            currentFilter: filter,
            handleApply: setFilter
          })}
        >
          <Ionicons name="filter" size={18} style={isFilterApply ? styles.activeFilter : styles.inactiveFilter} />
          <Text style={[styles.filterText, isFilterApply ? styles.activeFilter : styles.inactiveFilter]}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data?.pages.flatMap(page => page.results)}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ width: ITEM_WIDTH }}>
            <ProductCard item={item} />
          </View>
        )}
        contentContainerStyle={styles.productsContainer}
        columnWrapperStyle={styles.productsRow}
        showsVerticalScrollIndicator={false}
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

      <SortModal visible={openSort} onClose={() => setOpenSort(false)} sortType={sortBy} onChangeType={setSortBy} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgSecondary,
  },

  filterContainer: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    paddingVertical: 14,
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },
  filterText: {
    fontWeight: 600,
  },
  inactiveFilter: {
    color: Colors.textSecondary
  },
  activeFilter: {
    color: Colors.secondary
  },

  productsContainer: {
    paddingTop: 16,
    paddingBottom: 20,
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