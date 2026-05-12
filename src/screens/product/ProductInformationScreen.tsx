import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from "react-native";
import { Colors } from "../../theme/colors";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import StarRating from "../../components/common/StarRating";
import ProductCard from "../../components/product/ProductCard";
import ReviewCard from "../../components/review/ReviewCard";
import Header from "../../components/common/Header";
import ProductActionModal from "../../components/product/ProductActionModal";
import { useEffect, useState } from "react";
import { useProductDetail } from "../../services/product.service";
import { useRecommendProducts } from "../../services/recommendation.service";
import { useAddToWishlist, useRemoveFromWishlist } from "../../services/wishlist.service";
import { useRecordProductViewHistory } from "../../services/viewHistory.service";
import { useAddToCart } from "../../services/cart.service";
import { useCheckoutStore } from "../../stores/checkout.store";

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
  skinTypes: [
    { _id: "1", name: "oily skin" },
    { _id: "2", name: "dry skin" },
    { _id: "3", name: "normal skin" },
    { _id: "4", name: "acne skin" },
  ],
  tags: [
    { _id: "1", name: "hyaluronic" },
  ],
  selling_price: 100000,
  description: "Kem rửa mặt Hada Labo dưỡng ẩm với công dụng làm sạch sâu cùng hệ dưỡng ẩm sâu giúp dưỡng da ẩm mượt, sáng mịn, tươi trẻ mỗi ngày",
  image: 'https://picsum.photos/300/300',
  stock_quantity: 45,
  totalSold: 234,
  status: "published",
  avg_rating: 4.5,
  review_count: 55,
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

export default function ProductInformationScreen({ navigation, route }: any) {
  const { product_id } = route.params;

  const [viewed, setViewed] = useState(0);

  const { data: productDetail, isLoading } = useProductDetail(product_id);
  const { data: recommendProducts } = useRecommendProducts(10);
  const [type, setType] = useState<"add_to_cart" | "buy">("add_to_cart");
  const [showModal, setShowModal] = useState(false);

  const recordViewMutate = useRecordProductViewHistory();
  const [isOnWishlist, setIsOnWishlist] = useState(false);
  const addToWishlistMutate = useAddToWishlist();
  const removeFromWishlistMutate = useRemoveFromWishlist();
  const addToCartMutation = useAddToCart();
  const { setSelectedItems } = useCheckoutStore();

  useEffect(() => {
    //console.log(productDetail)
    if (!productDetail) return;

    setViewed(viewed + 1);
    setIsOnWishlist(productDetail.isOnWishlist);
  }, [productDetail]);

  useEffect(() => {
    if (viewed == 1) recordViewMutate.mutate(product_id);
  }, [viewed]);

  const handleAddRemoveWishlist = () => {
    if (isOnWishlist) {
      removeFromWishlistMutate.mutate(
        product_id,
        {
          onSuccess: async () => {
            setIsOnWishlist(!isOnWishlist)
          }
        }
      )
    } else {
      addToWishlistMutate.mutate(
        product_id,
        {
          onSuccess: async () => {
            setIsOnWishlist(!isOnWishlist)
          }
        }
      )
    }
  };

  const handleAddToCart = (quantity: number) => {
    addToCartMutation.mutate({ product_id, quantity })
  };

  const handleBuyNow = (quantity: number) => {
    const orderItem = {
      product_id,
      product: {
        _id: product_id,
        name: productDetail.name,
        image: productDetail.image || "",
      },
      unit_price: productDetail.selling_price,
      quantity: quantity,
    }

    setSelectedItems([orderItem]); // lưu vào store
    navigation.navigate("Checkout")

  };

  if (isLoading) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
  return (
    <View style={styles.container}>
      <Header hasCart />

      <FlatList
        data={recommendProducts}
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
              source={{ uri: productDetail.image || undefined }}
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
                  {productDetail.selling_price.toLocaleString()}₫
                </Text>
                <TouchableOpacity
                  onPress={handleAddRemoveWishlist}
                >
                  <Ionicons
                    name={isOnWishlist ? "heart" : "heart-outline"}
                    size={24}
                    color={isOnWishlist ? Colors.secondary : Colors.text}
                  />
                </TouchableOpacity>
              </View>

              <Text style={{ fontSize: 16, fontWeight: 600 }}>
                {productDetail.name}
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
                  <StarRating rating={productDetail.avg_rating} />
                  <Text style={{ color: Colors.textSecondary, fontWeight: 500, fontSize: 12 }}>
                    {productDetail.review_count} review
                  </Text>
                </View>

                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}>
                  <Text style={{ color: Colors.textSecondary, fontSize: 12, }}>SKU:</Text>
                  <Text style={{ fontWeight: 500, fontSize: 12, }}>{productDetail.sku}</Text>
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
                <Text style={{ fontWeight: 500, fontSize: 13, }}>{productDetail.brand.name}</Text>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
                onPress={() => navigation.navigate("BrandProducts", { brand_id: productDetail.brand._id })}
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
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
                onPress={() => navigation.navigate("ProductDescription", { data: productDetail })}
              >
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
                  onPress={() => navigation.navigate("ReviewList", { product_id })}
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
                <StarRating rating={productDetail.avg_rating} />
                <Text style={{ color: Colors.rating, fontWeight: 500, fontSize: 12 }}>
                  {productDetail.avg_rating.toFixed(1)}
                </Text>
                <Text style={{ color: Colors.textSecondary, fontSize: 10 }}>
                  ({productDetail.review_count} review)
                </Text>
              </View>
            </View>

            <View style={{ marginHorizontal: 12, marginTop: 6, gap: 10, }}>
              {productDetail.reviews.map((item: any) => (
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
          onPress={() => {
            setType("add_to_cart")
            setShowModal(true)
          }}
        >
          <Ionicons name="cart-outline" size={18} color="white" />
          <Text style={styles.buttonText}>ADD TO CART</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => {
            setType("buy")
            setShowModal(true)
          }}
        >
          <Text style={styles.buttonText}>BUY NOW</Text>
        </TouchableOpacity>
      </View>

      <ProductActionModal
        visible={showModal}
        product={productDetail}
        onClose={() => setShowModal(false)}
        onAdd={(qty) => {
          handleAddToCart(qty);
        }}
        onBuyNow={(qty) => {
          handleBuyNow(qty);
        }}
        type={type}
      />
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