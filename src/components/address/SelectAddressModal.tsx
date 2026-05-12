import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Colors } from "../../theme/colors";
import { Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface Item {
  code: number;
  name: string;
}

export default function SelectAddressModal({
  visible,
  onClose,
  placeholder = "Search...",
  items,
  selectedItem,
  onSelect
}: {
  visible: boolean;
  onClose: () => void;
  placeholder?: string;
  items: Item[];
  selectedItem: Item | null;
  onSelect: (item: Item) => void
}) {
  const [searchKey, setSearchKey] = useState("");
  const filteredItems = items.filter(item => item.name.includes(searchKey));

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>
              <View style={styles.header}>
                <TextInput
                  value={searchKey}
                  onChangeText={setSearchKey}
                  placeholder={placeholder}
                  style={styles.searchBar}
                />
                <TouchableOpacity onPress={() => onClose()}>
                  <Ionicons name="close" size={24} />
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View style={styles.itemContainer}>
                  {filteredItems.map(item => {
                    const isActive = item.code == selectedItem?.code || false;

                    return (
                      <TouchableOpacity
                        key={item.code}
                        style={styles.item}
                        onPress={() => {
                          onSelect(item)
                          onClose()
                        }}
                      >
                        <Text >
                          {item.name}
                        </Text>
                        {isActive && <Feather name="check" size={22} color={Colors.secondary} />}
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </ScrollView>
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
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    height: "80%",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderColor: Colors.border
  },
  searchBar: {
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    flex: 1,
  },

  itemContainer: {
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: Colors.divider,
  },
});