import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { Colors } from "../../theme/colors";
import { Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import Header from "../../components/common/Header";

export type Gender = "male" | "female" | "other";

export default function EditProfileScreen() {
  const navigation = useAppNavigation();

  let username = "ikikasumi";
  let phone = "0912345678";
  let email = "huyenbtp2005@gmail.com";
  const [fullName, setFullName] = useState("Bui Huyen");
  const [gender, setGender] = useState<Gender>("female");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [changePhone, setChangePhone] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [currentPass, setCurrentPass] = useState("");

  const handleSave = () => {
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <Header title="Personal Information" />

      <ScrollView>
        <View style={styles.info}>
          {/* Username */}
          <View>
            <Text style={styles.label}>Username</Text>
            <View style={styles.disabledInput}>
              <Text>{username}</Text>
            </View>
            <View style={styles.noteRow}>
              <Feather name="alert-circle" size={14} color={Colors.textLight} />
              <Text style={styles.note}>
                This school cannot be changed.
              </Text>
            </View>
          </View>

          {/* Full Name */}
          <View>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
          </View>

          {/* Gender */}
          <View>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderRow}>
              {["male", "female", "other"].map((g) => {
                const isActive = gender === g;

                return (
                  <TouchableOpacity
                    key={g}
                    style={styles.genderItem}
                    onPress={() => setGender(g as Gender)}
                  >
                    {isActive
                      ? <Fontisto name="radio-btn-active" size={20} color={Colors.secondary} />
                      : <Fontisto name="radio-btn-passive" size={20} color={Colors.textPlaceholder} />
                    }
                    <Text style={[styles.genderText, isActive && styles.genderActiveText]}>
                      {g === "male" ? "Male" : g === "female" ? "Female" : "Prefer not to say"}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>

          {/* Phone */}
          <View>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.disabledInput}>
              <Text>{phone}</Text>
            </View>
          </View>

          {/* Email */}
          <View>
            <Text style={styles.label}>Email</Text>
            <View style={styles.disabledInput}>
              <Text>{email}</Text>
            </View>
          </View>

          {/* Options */}
          <View>
            <View style={styles.checkboxRow}>
              <Checkbox
                value={changePhone}
                onValueChange={setChangePhone}
                style={{ borderRadius: 5 }}
                color={Colors.primary600}
              />
              <Text style={styles.checkboxText}>Change Phone Number</Text>
            </View>

            <View style={styles.checkboxRow}>
              <Checkbox
                value={changeEmail}
                onValueChange={setChangeEmail}
                style={{ borderRadius: 5 }}
                color={Colors.primary600}
              />
              <Text style={styles.checkboxText}>Change Email</Text>
            </View>

            <View style={{ marginTop: 20, gap: 20 }}>
              {changePhone && (
                <View>
                  <Text style={styles.label}>New phone number *</Text>
                  <TextInput
                    value={newPhone}
                    onChangeText={setNewPhone}
                    placeholder="Enter new phone number"
                    style={styles.input}
                  />
                </View>
              )}

              {changeEmail && (
                <View>
                  <Text style={styles.label}>New email *</Text>
                  <TextInput
                    value={newEmail}
                    onChangeText={setNewEmail}
                    placeholder="Enter new email"
                    style={styles.input}
                  />
                </View>
              )}

              {(changePhone || changeEmail) && (
                <View>
                  <Text style={styles.label}>Current password *</Text>
                  <TextInput
                    value={newEmail}
                    onChangeText={setNewEmail}
                    placeholder="Enter password"
                    style={styles.input}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  disabledInput: {
    backgroundColor: Colors.bgDisabled,
    padding: 12,
    borderRadius: 8,
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  note: {
    fontSize: 11,
    color: Colors.textLight,
  },

  genderRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 8,
  },
  genderItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  genderText: {
    fontSize: 13,
    color: Colors.textSecondary
  },
  genderActiveText: {
    fontWeight: "400",
    color: Colors.text
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
  },
  checkboxText: {
    fontWeight: "500",
    fontSize: 13,
  },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    marginTop: 'auto',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: Colors.primary600,
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  saveText: {
    color: Colors.textInverse,
    fontWeight: "600",
  },
});