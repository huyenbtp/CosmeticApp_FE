import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";
import { Colors } from "../../theme/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import Header from "../../components/common/Header";


export default function ProfileInformationScreen() {
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Header title="Personal Information" />

      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>ikikasumi</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>Huyen Bui</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>Female</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>31/10/2005</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Skin Type</Text>
          <Text style={styles.value}>Normal</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>0987654321</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>huyenbtp2005@gmail.com</Text>
        </View>

      </View>
      <TouchableOpacity style={styles.button}>
        <Feather name="edit-3" size={20} style={styles.buttonText} />
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },

  info: {
    backgroundColor: Colors.card,
    padding: 18,
    gap: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary
  },
  value: {
    fontSize: 12,
    fontWeight: 500,
  },

  button: {
    backgroundColor: Colors.card,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 16,
    margin: 4,
  },
  buttonText: {
    color: Colors.primary
  }
});