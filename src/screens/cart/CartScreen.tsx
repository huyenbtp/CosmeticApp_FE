import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from "react-native";
import Checkbox from 'expo-checkbox';
import { Colors } from "../../theme/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { useEffect, useState } from "react";
import { ICartItem } from "../../types/cartItem";
import Header from "../../components/common/Header";
import { IOrderItem } from "../../types/orderItem";
import { useCheckoutStore } from "../../stores/checkout.store";
import { useCartItems, useDeleteCartItem, useUpdateCartItem } from "../../services/cart.service";

const mockCartItem: ICartItem[] = [
  {
    _id: "1",
    product_id: "1",
    product: {
      _id: "3",
      name: "Tinh Chất Dưỡng Ẩm Torriden Dive-In Serum 50ml",
      price: 299000,
      image: "https://picsum.photos/200/200?random=3",
    },
    quantity: 1,
    createdAt: "2024-04-04T05:00:00Z",
    updatedAt: "2024-04-04T05:00:00Z",
  },
  {
    _id: "2",
    product_id: "2",
    product: {
      _id: "1",
      name: "Kem Chống Nắng Cho Da Nhạy Cảm Skin1004 Madagascar Centella Air-Fit Suncream Plus Spf50+ Pa++++ 50Ml",
      price: 250000,
      image: "https://picsum.photos/200/200?random=2",
    },
    quantity: 2,
    createdAt: "2024-04-04T05:00:00Z",
    updatedAt: "2024-04-04T05:00:00Z",
  },
];

export default function CartScreen() {
  const navigation = useAppNavigation();

  const { data: cart = [], isLoading } = useCartItems();

  const updateQtyMutation = useUpdateCartItem();
  const deleteMutation = useDeleteCartItem();

  const { setSelectedItems } = useCheckoutStore();
  const [selectedItemID, setSelectedItemId] = useState<string[]>([]);

  if (isLoading) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );

  const isAllSelected = cart.length === selectedItemID.length;

  const toggleSelect = (id: string, value: boolean) => {
    if (!value) setSelectedItemId(prev => prev.filter(item => item !== id))
    else setSelectedItemId(prev => [...prev, id])
  };

  const handleSelectAll = (value: boolean) => {
    if (value) setSelectedItemId(cart.map((item) => item._id));
    else setSelectedItemId([])
  }

  const removeItem = (cartItemId: string) => {
    deleteMutation.mutate(cartItemId);
  }

  // 🔹 tổng tiền
  const total = cart.reduce(
    (sum, item) =>
      selectedItemID.includes(item._id) ? sum + item.product.price * item.quantity : sum,
    0
  );

  const handleApply = () => {
    const selected = cart.filter((item) => selectedItemID.includes(item._id));

    const orderItem: IOrderItem[] = selected.map((item) => ({
      product_id: item.product._id,
      product: {
        _id: item.product_id,
        name: item.product.name,
        image: item.product.image || "",
      },
      unit_price: item.product.price,
      quantity: item.quantity,
    }))

    setSelectedItems(orderItem); // lưu vào store
    navigation.navigate("Checkout")
  }

  // 🔹 render item
  const renderItem = ({ item }: { item: ICartItem }) => (
    <View style={styles.item}>
      <View style={{ width: "auto" }}>
        <Checkbox
          value={selectedItemID.includes(item._id)}
          onValueChange={(value) => toggleSelect(item._id, value)}
          style={{ borderRadius: 5 }}
          color={Colors.primary500}
        />
      </View>
      <TouchableOpacity
        style={styles.infoContainer}
        onPress={() => navigation.navigate("ProductInformation", { product_id: item.product_id })}
      >
        <Image source={{ uri: item.product.image || undefined }} style={styles.imagePlaceholder} />

        <View style={{ flex: 1, justifyContent: "space-between", }}>
          <Text numberOfLines={2} style={styles.name}>{item.product.name}</Text>

          <View style={styles.row}>
            <Text style={styles.price}>{(item.product.price).toLocaleString()}₫</Text>

            <View style={styles.row}>
              {/* Quantity */}
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQtyMutation.mutate({
                    cartItemId: item._id,
                    quantity: item.quantity - 1
                  })}
                >
                  <Text>-</Text>
                </TouchableOpacity>

                <Text style={styles.qty}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQtyMutation.mutate({
                    cartItemId: item._id,
                    quantity: item.quantity + 1
                  })}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>

              {/* Remove */}
              <TouchableOpacity style={{}} onPress={() => removeItem(item._id)}>
                <Feather name="trash-2" size={16} color={Colors.textPlaceholder} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Cart" />

      <FlatList
        data={cart}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{}}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 50 }}>
            Cart is empty
          </Text>
        }
      />

      {/* Bottom */}
      <View style={styles.footerContainer}>
        <View style={styles.row}>
          <View style={styles.row}>
            <Checkbox
              value={isAllSelected}
              onValueChange={(value) => handleSelectAll(value)}
              color={Colors.primary}
            />
            <Text style={styles.totalLabel}>All</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.price}>
              {total.toLocaleString()}₫
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => handleApply()}
        >
          <Text style={styles.checkoutText}>COMPLETE PAYMENT</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgInput,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 14,
    marginTop: 8,
    backgroundColor: Colors.card,
    padding: 16,
    gap: 12,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },

  imagePlaceholder: {
    width: 90,
    height: 90,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: Colors.bgInput,
    borderRadius: 6,
  },
  detailText: {
    fontSize: 10,
    color: Colors.textSecondary,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 30,
    paddingHorizontal: 6,
  },
  qtyBtn: {
    width: 24,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  qty: {
    fontSize: 12,
    fontWeight: "500",
    marginHorizontal: 6,
  },
  price: {
    fontWeight: "600",
    color: Colors.secondary,
    marginVertical: 4,
  },

  footerContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    gap: 24,
  },
  totalLabel: {
    fontWeight: "500",
    fontSize: 12,
    marginLeft: 8,
  },
  checkoutBtn: {
    alignItems: "center",
    backgroundColor: Colors.primary500,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 30,
  },
  checkoutText: {
    color: Colors.textInverse,
    fontWeight: "500",
    fontSize: 12,
  },
});