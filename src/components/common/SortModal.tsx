import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Colors } from "../../theme/colors";
import { Fontisto, Ionicons } from "@expo/vector-icons";

const sortTypes = [
  { id: "new", title: "New", },
  { id: "lthp", title: "Low to high price" },
  { id: "htlp", title: "High to low price" },
  { id: "none", title: "All" }
];

export type SortType = "new" | "lthp" | "htlp" | "none";

export default function SortModal({
  visible,
  onClose,
  sortType,
  onChangeType
}: {
  visible: boolean;
  onClose: () => void;
  sortType: SortType;
  onChangeType: (type: SortType) => void
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Sort by</Text>
            <TouchableOpacity onPress={() => onClose()}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.itemContainer}>
            {sortTypes.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={() => {
                  onChangeType(item.id as SortType)
                  onClose()
                }}
              >
                {item.id === sortType
                  ? <Fontisto name="radio-btn-active" size={20} color={Colors.secondary} />
                  : <Fontisto name="radio-btn-passive" size={20} color={Colors.textPlaceholder} />
                }
                <Text style={styles.itemText}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
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
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    height: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: Colors.border
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },

  itemContainer: {
    paddingVertical: 24,
    paddingHorizontal: 10,
    gap: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  itemText: {
    fontWeight: 500,
    color: Colors.textSecondary
  },
});