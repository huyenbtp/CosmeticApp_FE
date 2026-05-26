import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../theme/colors";
import { IProductDetail } from "../../types/product";

interface Props {
  visible: boolean;
  onClose: () => void;
  product: IProductDetail;
  onAdd: (quantity: number) => void;
  onBuyNow: (quantity: number) => void;
  type: "add_to_cart" | "buy"
}

export default function ProductActionModal({
  visible,
  onClose,
  product,
  onAdd,
  onBuyNow,
  type,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const onApply = () => {
    if (type === "add_to_cart") onAdd(quantity);
    else onBuyNow(quantity);

    setQuantity(1);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {/* Close */}
              <TouchableOpacity style={styles.close} onPress={onClose}>
                <Ionicons name="close" size={22} />
              </TouchableOpacity>

              {/* Product */}
              <View style={styles.productRow}>
                <Image
                  source={{ uri: product.image || undefined }}
                  style={styles.image}
                />

                <View style={{ flex: 1, gap: 10 }}>
                  <Text style={styles.price}>
                    {product.selling_price.toLocaleString()}₫
                  </Text>
                  <Text numberOfLines={2} style={styles.stock}>
                    Stock: {product.available_stock}
                  </Text>
                </View>
              </View>

              {/* Quantity */}
              <View style={styles.qtyContainer}>
                <Text style={styles.label}>Quantity:</Text>

                <View style={styles.qtyRow}>
                  <TouchableOpacity style={styles.qtyBtn} onPress={decrease}>
                    <Text>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qty}>{quantity}</Text>

                  <TouchableOpacity style={styles.qtyBtn} onPress={increase}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Button */}
              {type === "add_to_cart" ? (
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={onApply}
                >
                  <Ionicons name="cart-outline" size={18} color="white" />
                  <Text style={styles.buttonText}>ADD TO CART</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={onApply}
                >
                  <Text style={styles.buttonText}>BUY NOW</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.bgOverlay,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    gap: 16,
  },

  close: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
  },

  productRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  price: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 18,
  },
  stock: {
    fontWeight: "400",
    fontSize: 12,
    color: Colors.textSecondary,
  },

  qtyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  label: {
    marginBottom: 6,
    fontWeight: "500",
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

  addToCartButton: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    marginTop: 8,
  },
  buyButton: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: Colors.secondary,
    marginTop: 8,
  },
  buttonText: {
    color: Colors.textInverse,
    fontSize: 12,
    fontWeight: 500,
  },
});