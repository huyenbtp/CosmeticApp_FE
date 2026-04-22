import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions, } from "react-native";
import { Colors } from "../../theme/colors";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import BrandCarousel from "../../components/brand/BrandCarousel";
import CategoryCarousel from "../../components/category/CategoryCarousel";
import { IProduct } from "../../types/product";
import ProductCarousel from "../../components/product/ProductCarousel";
import ProductCard from "../../components/product/ProductCard";
import AutoBanner from "./AutoBanner";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import Header from "../../components/common/Header";

export const mockRecommendProducts: IProduct[] = [
  {
    _id: "1",
    name: "Son Dior Addict Lip Glow",
    brand: "Dior",
    selling_price: 850000,
    image: "https://picsum.photos/200/300?random=1",
    rating: 4.5,
  },
  {
    _id: "2",
    name: "Kem nền Estee Lauder Double Wear",
    brand: "Estee Lauder",
    selling_price: 1200000,
    image: "https://picsum.photos/200/300?random=2",
    rating: 4.9,
  },
  {
    _id: "3",
    name: "Son MAC Ruby Woo",
    brand: "MAC",
    selling_price: 600000,
    image: "https://picsum.photos/200/300?random=3",
    rating: 4.5,
  },
  {
    _id: "4",
    name: "Phấn phủ Innisfree",
    brand: "Innisfree",
    selling_price: 300000,
    image: "https://picsum.photos/200/300?random=4",
    rating: 5.0,
  },
  {
    _id: "5",
    name: "Son Dior Addict Lip Glow",
    brand: "Dior",
    selling_price: 850000,
    image: "https://picsum.photos/200/300?random=5",
    rating: 0,
  },
  {
    _id: "6",
    name: "Kem nền Estee Lauder Double Wear",
    brand: "Estee Lauder",
    selling_price: 1200000,
    image: "https://picsum.photos/200/300?random=6",
    rating: 4,
  },
];

const { width } = Dimensions.get("window");
const COLUMN_GAP = 12;
const PADDING_HORIZONTAL = 14;
const ITEM_WIDTH = (width - PADDING_HORIZONTAL * 2 - COLUMN_GAP) / 2;

export default function HomeScreen() {
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Header hasGoBack={false} hasSearchBar hasCart />

      <FlatList
        data={mockRecommendProducts}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <ProductCard item={item} />
          </View>
        )}
        contentContainerStyle={styles.productsContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}

        // 👇 HEADER
        ListHeaderComponent={
          <>
            {/** 
              <BrandCarousel />

              <CategoryCarousel />
            */}

            <View style={styles.bannerContainer}>
              <AutoBanner />
            </View>

            <View style={styles.forYouContainer}>
              <FontAwesome name="heart" size={16} color={Colors.secondary} />
              <Text style={styles.title}>For You</Text>
            </View>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  bannerContainer: {
    backgroundColor: Colors.background,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  forYouContainer: {
    backgroundColor: Colors.background,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: PADDING_HORIZONTAL,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: 600,
    color: Colors.primary
  },

  productsContainer: {
    backgroundColor: Colors.surface
  },
  row: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: COLUMN_GAP,
    gap: COLUMN_GAP,
  },
  item: {
    width: ITEM_WIDTH,
  },
});