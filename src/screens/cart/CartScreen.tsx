import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import Checkbox from 'expo-checkbox';
import { Colors } from "../../theme/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { useState } from "react";
import { ICartItem } from "../../types/cartItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../components/common/Header";

const mockCartItem = [
  {
    _id: "1",
    name: "Tinh Chất Dưỡng Ẩm Torriden Dive-In Serum 50m",
    price: 299000,
    image: "https://picsum.photos/200/200?random=1",
    quantity: 1,
  },
  {
    _id: "2",
    name: "Kem Chống Nắng Cho Da Nhạy Cảm Skin1004 Madagascar Centella Air-Fit Suncream Plus Spf50+ Pa++++ 50Ml",
    price: 250000,
    image: "https://picsum.photos/200/200?random=2",
    quantity: 2,
  },
];

export default function CartScreen() {
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();

  const [data, setData] = useState<ICartItem[]>(mockCartItem);
  const [cartItemID, setCartItemId] = useState<string[]>([]);

  const isAllSelected = data.length === cartItemID.length;

  const toggleSelect = (id: string, value: boolean) => {
    if (!value) setCartItemId(prev => prev.filter(item => item !== id))
    else setCartItemId(prev => [...prev, id])
  };

  const handleSelectAll = (value: boolean) => {
    if (value) setCartItemId(data.map((item) => item._id));
    else setCartItemId([])
  }

  // 🔹 tăng giảm số lượng
  const increaseQty = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };
  const decreaseQty = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // 🔹 xóa sản phẩm
  const removeItem = (id: string) => {

  };

  // 🔹 tổng tiền
  const total = data.reduce(
    (sum, item) =>
      cartItemID.includes(item._id) ? sum + item.price * item.quantity : sum,
    0
  );

  // 🔹 render item
  const renderItem = ({ item }: { item: ICartItem }) => (
    <View style={styles.item}>
      <View style={{ width: "auto" }}>
        <Checkbox
          value={cartItemID.includes(item._id)}
          onValueChange={(value) => toggleSelect(item._id, value)}
          color={Colors.primary}
        />
      </View>
      <View style={styles.infoContainer}>
        <Image source={{ uri: item.image }} style={styles.imagePlaceholder} />

        <View style={{ flex: 1, justifyContent: "space-between", }}>
          <Text numberOfLines={2} style={styles.name}>{item.name}</Text>

          <View style={styles.row}>
            <Text style={styles.price}>{(item.price).toLocaleString()}₫</Text>

            <View style={styles.row}>
              {/* Quantity */}
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => decreaseQty(item._id)}
                >
                  <Text>-</Text>
                </TouchableOpacity>

                <Text style={styles.qty}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => increaseQty(item._id)}
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
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Cart" />

      <FlatList
        data={data}
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
      <View style={[styles.footerContainer, { marginBottom: insets.bottom }]}>
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
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>COMPLETE PAYMENT</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: Colors.primary,
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