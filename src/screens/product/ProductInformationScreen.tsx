import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { Colors } from "../../theme/colors";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import StarRating from "../../components/common/StarRating";
import ProductCard from "../../components/product/ProductCard";
import { mockRecommendProducts } from "../home/HomeScreen";
import ReviewCard from "../../components/review/ReviewCard";
import Header from "../../components/common/Header";

const { width } = Dimensions.get("window");
const COLUMN_GAP = 12;
const PADDING_HORIZONTAL = 14;
const ITEM_WIDTH = (width - PADDING_HORIZONTAL * 2 - COLUMN_GAP) / 2;

const mockProduct = {
  _id: '1',
  sku: 'CLS-ROH-0001',
  name: "Sữa rửa mặt dưỡng ẩm tối ưu Hada Labo Advanced Nourish Cleanser 80g",
  category: {
    _id: "1",
    name: "Cleanser",
  },
  brand: {
    _id: "1",
    name: "Hada Labo",
  },
  selling_price: 100000,
  description: "Kem rửa mặt Hada Labo dưỡng ẩm với công dụng làm sạch sâu cùng hệ dưỡng ẩm sâu giúp dưỡng da ẩm mượt, sáng mịn, tươi trẻ mỗi ngày",
  image: 'https://picsum.photos/300/300',
  stock_quantity: 45,
  totalSold: 234,
  status: "published",
  rating: 4.5,
  numberOfReview: 55,
  reviews: [
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
  ],
  isOnWishlist: false,
};

export default function ProductInformationScreen() {
  const navigation = useAppNavigation();

  const data = mockProduct;

  const handleAddToWishlist = () => {

  }

  return (
    <View style={styles.container}>
      <Header hasCart />

      <FlatList
        data={mockRecommendProducts}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ width: ITEM_WIDTH }}>
            <ProductCard item={item} />
          </View>
        )}
        columnWrapperStyle={styles.productsRow}
        showsVerticalScrollIndicator={false}

        ListHeaderComponent={
          <>
            <Image
              source={{ uri: data.image }}
              style={{
                width: "100%",
                height: 420,
              }}
            />

            <View style={styles.sectionContainer}>
              {/** price*/}
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <Text style={styles.price}>
                  {data.selling_price.toLocaleString()}₫
                </Text>
                <TouchableOpacity onPress={handleAddToWishlist}>
                  <Ionicons
                    name={data.isOnWishlist ? "heart" : "heart-outline"}
                    size={24}
                    color={data.isOnWishlist ? Colors.secondary : Colors.text}
                  />
                </TouchableOpacity>
              </View>

              <Text style={{ fontSize: 16, fontWeight: 600 }}>
                {data.name}
              </Text>

              {/** rating and sku */}
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 4,
              }}>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6
                }}>
                  <StarRating rating={data.rating} />
                  <Text style={{ color: Colors.textSecondary, fontWeight: 500, fontSize: 12 }}>
                    {data.numberOfReview} review
                  </Text>
                </View>

                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}>
                  <Text style={{ color: Colors.textSecondary, fontSize: 12, }}>SKU:</Text>
                  <Text style={{ fontWeight: 500, fontSize: 12, }}>{data.sku}</Text>
                </View>
              </View>
            </View>

            {/** brand*/}
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 14,
              borderBottomWidth: 1,
              borderBottomColor: Colors.border,
              backgroundColor: Colors.background
            }}>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}>
                <Text style={{ color: Colors.textSecondary, fontSize: 13, }}>Brand:</Text>
                <Text style={{ fontWeight: 500, fontSize: 13, }}>{data.brand.name}</Text>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
                onPress={() => navigation.navigate("BrandProducts", { brand_id: data.brand._id })}
              >
                <Text style={{ color: Colors.textSecondary, fontSize: 12, }}>View more</Text>
                <Ionicons name="chevron-forward-outline" size={14} />
              </TouchableOpacity>
            </View>

            {/** product detail */}
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 14,
              marginBottom: 6,
              backgroundColor: Colors.background
            }}>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}>
                <Text style={{ fontWeight: 500, fontSize: 14, }}>Description</Text>
              </View>
              <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}>
                <Text style={{ color: Colors.textSecondary, fontSize: 12, }}>View more</Text>
                <Ionicons name="chevron-forward-outline" size={14} />
              </TouchableOpacity>
            </View>

            {/** review */}
            <View style={styles.sectionContainer}>
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <Text style={{ fontWeight: 500, }}>Review</Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                  onPress={() => navigation.navigate("ReviewList", { product_id: data._id })}
                >
                  <Text style={{ color: Colors.textSecondary, fontSize: 12, }}>View all</Text>
                  <Ionicons name="chevron-forward-outline" size={14} />
                </TouchableOpacity>
              </View>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6
              }}>
                <StarRating rating={data.rating} />
                <Text style={{ color: Colors.rating, fontWeight: 500, fontSize: 12 }}>
                  {data.rating.toFixed(1)}
                </Text>
                <Text style={{ color: Colors.textSecondary, fontSize: 10 }}>
                  ({data.numberOfReview} review)
                </Text>
              </View>
            </View>

            <View style={{ marginHorizontal: 12, marginTop: 6, gap: 10, }}>
              {data.reviews.map((item) => (
                <ReviewCard item={item} key={item._id} />
              ))}
            </View>

            <Text style={[
              styles.sectionContainer, {
                textAlign: "center",
                color: Colors.primary,
                fontWeight: 700,
                padding: 20,
                marginTop: 20,
              }
            ]}>
              You May Also Like
            </Text>
          </>
        }
      />

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="cart-outline" size={18} color="white" />
          <Text style={styles.buttonText}>ADD TO CART</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>BUY NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgSecondary,
  },

  sectionContainer: {
    padding: 14,
    marginBottom: 8,
    gap: 8,
    backgroundColor: Colors.background,
  },

  price: {
    fontSize: 20,
    fontWeight: 600,
    color: Colors.secondary,
  },

  productsRow: {
    paddingHorizontal: PADDING_HORIZONTAL,
    marginBottom: COLUMN_GAP,
    gap: COLUMN_GAP,
  },

  footerContainer: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: Colors.surface,
    gap: 8,
  },
  addToCartButton: {
    flex: 2,
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderRadius: 40,
    backgroundColor: Colors.primary
  },
  buyButton: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: Colors.secondary
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: 500,
  }
});