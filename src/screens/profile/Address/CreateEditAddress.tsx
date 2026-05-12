import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform, ScrollView, Switch, } from "react-native";
import { Colors } from "../../../theme/colors";
import Header from "../../../components/common/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import SelectAddressModal from "../../../components/address/SelectAddressModal";
import { useCreateAddress, useUpdateUserAddress } from "../../../services/userAddress.service";
import { useToast } from "../../../providers/ToastProvider";

interface Province {
  code: number;
  name: string;
}

interface District {
  code: number;
  name: string;
}

interface Ward {
  code: number;
  name: string;
}

export default function CreateEditAddressScreen({ navigation, route }: any) {
  const { mode, editingAddress } = route.params;
  const { showMessage } = useToast();

  const [modalType, setModalType] = useState<"province" | "district" | "ward">("province");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [receiverName, setReceiverName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [isDefault, setIsDefault] = useState(true);

  const createAddressMutate = useCreateAddress();
  const updateAddressMutate = useUpdateUserAddress();

  useEffect(() => {
    if (editingAddress) {
      setReceiverName(editingAddress.receiver_name)
      setPhone(editingAddress.phone)
      setAddressLine(editingAddress.address_line)
      setSelectedProvince({ code: editingAddress.city_code, name: editingAddress.city })
      setSelectedDistrict({ code: editingAddress.district_code, name: editingAddress.district })
      setSelectedWard({ code: editingAddress.ward_code, name: editingAddress.ward })
      setIsDefault(editingAddress.is_default)
    }
  }, [editingAddress]);
  
  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) fetchDistricts(selectedProvince.code);
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) fetchWards(selectedDistrict.code);
  }, [selectedDistrict]);

  const fetchProvinces = async () => {
    try {
      setLoading(true);

      const res = await axios.get('https://provinces.open-api.vn/api/p/');

      setProvinces(res.data);
    } catch (error) {
      //Alert.alert('Lỗi', 'Không tải được tỉnh/thành');
    } finally {
      setLoading(false);
    }
  };

  const fetchDistricts = async (provinceCode: number) => {
    try {
      setLoading(true);

      const res = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);

      setDistricts(res.data.districts || []);
    } catch (error) {
      //Alert.alert('Lỗi', 'Không tải được quận/huyện');
    } finally {
      setLoading(false);
    }
  };

  const fetchWards = async (districtCode: number) => {
    try {
      setLoading(true);

      const res = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);

      setWards(res.data.wards || []);
    } catch (error) {
      //Alert.alert('Lỗi', 'Không tải được phường/xã');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProvince = async (province: Province) => {
    setSelectedProvince(province);

    setSelectedDistrict(null);
    setSelectedWard(null);

    setDistricts([]);
    setWards([]);
  };

  const handleSelectDistrict = async (district: District) => {
    setSelectedDistrict(district);

    setSelectedWard(null);

    setWards([]);
  };

  const handleSubmit = () => {
    if (
      !receiverName ||
      !phone ||
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard ||
      !addressLine
    ) {
      return showMessage("Please fill all required fields", "warning");
    }

    if (phone !== undefined) {
      const phoneRegex = /^(0|\+84)[0-9]{9}$/;
      if (!phoneRegex.test(phone)) {
        return showMessage('Invalid phone number', "warning");
      }
    }

    const payload = {
      receiver_name: receiverName,
      phone,
      city_code: selectedProvince.code,
      district_code: selectedDistrict.code,
      ward_code: selectedWard.code,
      city: selectedProvince.name,
      district: selectedDistrict.name,
      ward: selectedWard.name,
      address_line: addressLine,
      is_default: isDefault
    };

    if (mode === "create") {
      createAddressMutate.mutate(
        payload,
        {
          onSuccess: () => {
            navigation.goBack()
          }
        }
      );
    } else {
      updateAddressMutate.mutate(
        { _id: editingAddress._id, ...payload },
        {
          onSuccess: () => {
            navigation.goBack()
          }
        }
      )
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Header title={mode == "create" ? "New Address" : "Edit Address"} />

        <ScrollView>
          <View style={styles.info}>
            {/* Receiver Name */}
            <View>
              <Text style={styles.label}>Receiver Name *</Text>
              <TextInput
                textContentType="name"
                value={receiverName}
                onChangeText={(value) => setReceiverName(value)}
                placeholder="Enter receiver name"
                style={styles.input}
              />
            </View>

            {/* Phone */}
            <View>
              <Text style={styles.label}>Phone Number *</Text>
              <TextInput
                value={phone}
                onChangeText={(value) => setPhone(value)}
                placeholder="Enter phone number"
                style={styles.input}
                keyboardType="numeric"
              />
            </View>

            {/* Address Line */}
            <View>
              <Text style={styles.label}>Address Line *</Text>
              <TextInput
                value={addressLine}
                onChangeText={(value) => setAddressLine(value)}
                placeholder="Enter address line"
                style={styles.input}
              />
            </View>

            {/* City */}
            <View>
              <Text style={styles.label}>City *</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  setModalType("province")
                  setShowModal(true)
                }}
              >
                <Text style={{ color: selectedProvince ? Colors.text : Colors.textLight }}>
                  {selectedProvince ? selectedProvince.name : "Select city"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* District */}
            {selectedProvince && (
              <View>
                <Text style={styles.label}>District *</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {
                    setModalType("district")
                    setShowModal(true)
                  }}
                >
                  <Text style={{ color: selectedDistrict ? Colors.text : Colors.textLight }}>
                    {selectedDistrict ? selectedDistrict.name : "Select district"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Ward */}
            {selectedDistrict && (
              <View>
                <Text style={styles.label}>Ward *</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {
                    setModalType("ward")
                    setShowModal(true)
                  }}
                >
                  <Text style={{ color: selectedWard ? Colors.text : Colors.textLight }}>
                    {selectedWard ? selectedWard.name : "Select ward"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Is Default */}
            <View style={styles.row}>
              <Switch
                value={isDefault}
                onValueChange={setIsDefault}
                thumbColor={Colors.secondary}
                trackColor={{ true: Colors.secondary300, false: Colors.bgDisabled }}
                disabled={editingAddress?.is_default || false}
              />
              <Text>Default address</Text>
            </View>

          </View>
        </ScrollView>

        {/* Bottom */}
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={styles.addButtonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SelectAddressModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        placeholder="Search..."
        items={modalType == "province" ? provinces : modalType == "district" ? districts : wards}
        selectedItem={modalType == "province" ? selectedProvince : modalType == "district" ? selectedDistrict : selectedWard}
        onSelect={modalType == "province" ? handleSelectProvince : modalType == "district" ? handleSelectDistrict : setSelectedWard}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  info: {
    padding: 18,
    gap: 22
  },

  label: {
    marginBottom: 6,
    fontWeight: "400",
    fontSize: 13,
    color: Colors.textSecondary
  },
  input: {
    backgroundColor: Colors.bgInput,
    padding: 12,
    borderRadius: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },

  footerContainer: {
    padding: 16,
    backgroundColor: Colors.background,
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