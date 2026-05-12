import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, } from "react-native";
import { Colors } from "../../../theme/colors";
import { Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import Header from "../../../components/common/Header";
import { IUserAddress } from "../../../types/userAddress";
import { useAppNavigation } from "../../../navigation/useAppNavigation";
import { useCheckoutStore } from "../../../stores/checkout.store";
import { useUserAddresses } from "../../../services/userAddress.service";

const mockAddresses = [
  {
    _id: "1",
    user_id: "1",
    receiver_name: "Huyen Bui",
    phone: "0987654321",
    address_line: "Trường ĐH Công nghệ thông tin, Đường Hàn Thuyên",
    ward: "Phường Linh Xuân",
    district: "Quận Thủ Đức",
    city: "Tp. Hồ Chí Minh",
    is_default: true,
  },
  {
    _id: "2",
    user_id: "1",
    receiver_name: "Huyen Bui",
    phone: "0987654321",
    address_line: "Trường ĐH Công nghệ thông tin, Đường Hàn Thuyên",
    ward: "Phường Linh Xuân",
    district: "Quận Thủ Đức",
    city: "Tp. Hồ Chí Minh",
    is_default: false,
  },
];

export default function AddressListScreen({ route }: any) {
  const navigation = useAppNavigation()
  const { withCheckbox } = route.params;

  const { data, isLoading } = useUserAddresses();

  const { selectedAddress, setSelectedAddress } = useCheckoutStore();

  if (isLoading) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
  return (
    <View style={styles.container}>
      <Header title="My Address" />

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item} key={item._id}>
            {withCheckbox && selectedAddress && (
              <TouchableOpacity onPress={() => {
                navigation.popTo("Checkout")
                setSelectedAddress(item)
              }}>
                {selectedAddress._id === item._id
                  ? <Fontisto name="radio-btn-active" size={20} color={Colors.secondary} />
                  : <Fontisto name="radio-btn-passive" size={20} color={Colors.textPlaceholder} />
                }
              </TouchableOpacity>
            )}

            <View style={{ gap: 12, flex: 1 }}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.receiver_name} | {item.phone}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate(
                    "CreateEditAddress",
                    { mode: "edit", editingAddress: item }
                  )}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.address}>
                {item.address_line + ", " + item.ward + ", " + item.district + ", " + item.city}
              </Text>
              {item.is_default &&
                <View style={styles.row}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Default</Text>
                  </View>
                </View>
              }
            </View>
          </View>
        )}
        contentContainerStyle={{}}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 50 }}>
            Add a shipping address
          </Text>
        }
      />

      {/* Bottom */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate(
            "CreateEditAddress",
            { mode: "create" }
          )}
        >
          <Text style={styles.addButtonText}>ADD A SHIPPING ADDRESS</Text>
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

  item: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    padding: 18,
    gap: 12,
    borderColor: Colors.divider,
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 13,
    fontWeight: 700,
  },
  address: {
    fontSize: 12,
    color: Colors.textSecondary
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  buttonText: {
    fontSize: 12,
    color: Colors.secondary
  },

  badge: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
  },
  badgeText: {
    color: Colors.textInverse,
    fontSize: 10,
    fontWeight: 500,
  },

  footerContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    gap: 24,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 30,
  },
  addButtonText: {
    color: Colors.textInverse,
    fontWeight: "500",
    fontSize: 12,
  },
});