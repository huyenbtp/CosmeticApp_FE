import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../theme/colors";
import { Feather, Ionicons } from "@expo/vector-icons";

export type PaymentMethodType = "cod" | "bank";

export default function PaymentMethodCard({
  item,
  isActive,
  onSelect
}: {
  item: PaymentMethodType,
  isActive: boolean,
  onSelect: (method: PaymentMethodType) => void
}) {
  return (
    <TouchableOpacity
      style={[styles.paymentItem, isActive && { borderColor: Colors.secondary }]}
      onPress={() => onSelect(item)}
    >
      <View style={styles.row}>
        <Ionicons
          name={item === "cod" ? "wallet-outline" : "card-outline"}
          size={20}
          color={isActive ? Colors.secondary : Colors.textLight}
        />
        <Text style={isActive && { color: Colors.secondary }}>
          {item === "cod" ? "Cash on Delivery" : "Bank Transfer"}
        </Text>
      </View>

      {isActive && <Feather name="check" size={18} color={Colors.secondary} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  }
});