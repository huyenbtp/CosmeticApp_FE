import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "../../../theme/colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import ItemCard from "../../../components/order/OrderItemCard";
import Header from "../../../components/common/Header";
import { Feather } from "@expo/vector-icons";
import { IUserAddress } from "../../../types/userAddress";
import PaymentMethodCard, { PaymentMethodType } from "../../../components/payment/PaymentMethodCard";
import { useCheckoutStore } from "../../../stores/checkout.store";
import { useDefaultUserAddresses } from "../../../services/userAddress.service";

type RouteProps = RouteProp<RootStackParamList, "Checkout">;

const mockAddress = {
  _id: "1",
  user_id: "1",
  receiver_name: "Huyen Bui",
  phone: "0987654321",
  address_line: "Trường ĐH Công nghệ thông tin, Đường Hàn Thuyên",
  ward: "Phường Linh Xuân",
  district: "Quận Thủ Đức",
  city: "Tp. Hồ Chí Minh",
  is_default: true,
};

export default function CheckoutScreen({ navigation }: any) {
  const route = useRoute<RouteProps>();

  const {
    selectedItems,
    selectedAddress,
    setSelectedAddress,
    selectedPayment,
    setSelectedPayment,
    notes,
    setNotes,
  } = useCheckoutStore();

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );
  const total_items = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const shipping_fee = 20000;
  const discount_amount = 0;
  const total_estimated = subtotal + shipping_fee - discount_amount;

  const handlePlaceOrder = async () => {
    const payload = {
      items: selectedItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
      })),
      shipping_fee,
      discount_amount,
      payment_method: selectedPayment,
      address: selectedAddress,
      notes,
    };

    //navigation.replace("OrderSuccessfully");
  };

  const { data: defaultUserAddress } = useDefaultUserAddresses();

  useEffect(() => {
    setSelectedPayment("cod")
    setNotes("")
    if (defaultUserAddress) setSelectedAddress(defaultUserAddress)
    else navigation.navigate("AddressList", { withCheckbox: true })
  }, []);

  if (!selectedAddress || !selectedItems) return;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Header title="Checkout" />

        <FlatList
          data={selectedItems}
          keyExtractor={(item) => item.product_id}
          contentContainerStyle={{}}
          ListHeaderComponent={
            <>
              {/* Address */}
              <View style={{ backgroundColor: Colors.secondary100, padding: 12 }}>
                <TouchableOpacity
                  style={[styles.section, { borderRadius: 12 }]}
                  onPress={() => navigation.navigate("AddressList", { withCheckbox: true })}
                >
                  <View style={styles.rowBetween}>
                    <Text style={[styles.text500, { color: Colors.secondary500 }]}>Shipping Address</Text>
                    <View style={styles.row}>
                      <Text style={styles.text400}>Change</Text>
                      <Feather name="chevron-right" size={20} color={Colors.textLight} />
                    </View>
                  </View>

                  <View style={{ gap: 6, }}>
                    <Text style={[styles.text500]}>{selectedAddress.receiver_name} - {selectedAddress.phone}</Text>
                    <Text style={styles.text400}>
                      {selectedAddress.address_line}, {selectedAddress.ward}, {selectedAddress.district}, {selectedAddress.city}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Products */}
              <View style={[styles.section, { paddingBottom: 8 }]}>
                <Text style={styles.sectionTitle}>Items List</Text>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <ItemCard item={item} disabled />
            </View>
          )}
          ListFooterComponent={
            <>
              <View style={[styles.section, { marginBottom: 12 }]}>
                <View style={[styles.rowBetween, { paddingVertical: 8 }]}>
                  <Text>
                    Subtotal ({selectedItems.length} items):
                  </Text>
                  <Text style={styles.price}>
                    {subtotal.toLocaleString()}₫
                  </Text>
                </View>
              </View>

              {/* Notes */}
              <View style={[styles.section, { marginBottom: 12 }]}>
                <Text style={styles.sectionTitle}>Order Notes</Text>

                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Enter order notes"
                  numberOfLines={3}
                  multiline={true}
                  style={styles.textInput}
                />
              </View>

              {/* Payment */}
              <View style={[styles.section, { marginBottom: 12 }]}>
                <Text style={styles.sectionTitle}>Payment Method</Text>

                <View>
                  {["cod", "bank"].map((item, index) => (
                    <PaymentMethodCard
                      key={index}
                      item={item as PaymentMethodType}
                      isActive={item === selectedPayment}
                      onSelect={setSelectedPayment}
                    />
                  ))}
                </View>
              </View>

              {/* Summary */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>

                <View style={{ gap: 14 }}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.text400}>
                      Subtotal ({total_items} item)
                    </Text>
                    <Text style={styles.text400}>
                      {subtotal.toLocaleString()}₫
                    </Text>
                  </View>

                  <View style={styles.rowBetween}>
                    <Text style={styles.text400}>
                      Shipping
                    </Text>
                    <Text style={styles.text400}>
                      {shipping_fee.toLocaleString()}₫
                    </Text>
                  </View>

                  {discount_amount > 0 && (
                    <View style={styles.rowBetween}>
                      <Text style={styles.text400}>
                        Discount
                      </Text>
                      <Text style={[styles.text400, { color: Colors.textError }]}>
                        -{discount_amount.toLocaleString()}₫
                      </Text>
                    </View>
                  )}

                  <View style={styles.rowBetween}>
                    <Text style={styles.text500}>
                      Total
                    </Text>
                    <Text style={styles.price}>
                      {total_estimated.toLocaleString()}₫
                    </Text>
                  </View>
                </View>
              </View>
            </>
          }
        />

        {/* Bottom */}
        <View style={styles.footerContainer}>
          <View>
            <Text style={styles.text500}>
              Total
            </Text>
            <Text style={styles.price}>
              {total_estimated.toLocaleString()}₫
            </Text>
          </View>
          <TouchableOpacity style={styles.orderBtn} onPress={handlePlaceOrder}>
            <Text style={styles.orderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgSecondary,
  },

  section: {
    backgroundColor: Colors.card,
    padding: 18,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    gap: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text400: {
    fontWeight: 400,
    fontSize: 12,
    color: Colors.text,
  },
  text500: {
    fontWeight: 500,
  },
  text600: {
    fontSize: 15,
    fontWeight: 600,
  },

  card: {
    paddingTop: 20,
    paddingHorizontal: 18,
    backgroundColor: Colors.card
  },

  textInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.secondary500
  },
  orderBtn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
  },
  orderText: {
    color: Colors.textInverse,
    fontWeight: "600",
  },
});