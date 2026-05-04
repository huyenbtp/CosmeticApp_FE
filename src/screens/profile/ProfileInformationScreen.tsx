import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, } from "react-native";
import { Colors } from "../../theme/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import Header from "../../components/common/Header";
import { useMe } from "../../services/auth.service";
import { useEffect } from "react";
import dayjs from "dayjs";

const mockUser = {
  name: "Phuong Huyen",
  gender: "female",
  dob: "",
  phone: "0912345678",
  email: "huyenbtp2005@gmail.com",
};

export default function ProfileInformationScreen() {
  const navigation = useAppNavigation();

  const { data: user, isLoading } = useMe();

  useEffect(() => {
    //console.log(user);
    if (!user) return;
    
  }, [user]);

  if (isLoading) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
  if (user) return (
    <View style={styles.container}>
      <Header title="Personal Information" />

      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.profile.full_name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>
            {user.profile.gender === "male" ? "Male" : user.profile.gender === "female" ? "Female" : "Prefer not to say"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>{dayjs(user.profile.dob).format("DD/MM/YYYY")}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{user.profile.phone}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditProfile")}>
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
    color: Colors.primary500
  }
});