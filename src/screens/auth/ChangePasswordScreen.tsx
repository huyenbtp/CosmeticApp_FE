import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../theme/colors";
import { useToast } from "../../providers/ToastProvider";
import { useChangePassword } from "../../services/auth.service";
import Header from "../../components/common/Header";

export default function ChangePasswordScreen() {
  const { showMessage } = useToast();

  const [oldPass, setOldPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureOld, setSecureOld] = useState(true);
  const [secureNew, setSecureNew] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const { mutate, isPending } = useChangePassword();

  const handleSubmit = async () => {
    if (!oldPass.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      return showMessage("Please fill all required fields", "warning");
    };

    if (newPassword.length < 8) {
      return showMessage("Password must be at least 8 characters", "warning");
    }

    if (newPassword !== confirmPassword) {
      return showMessage("Confirm password do not match", "warning");
    };

    mutate(
      { oldPassword: oldPass, newPassword: newPassword },
      {
        onSuccess: async (data) => {
          showMessage("Changed password sucessfully!");
        },
        onError: (error: any) => {
          showMessage(error.response?.data.message, "error");
        }
      }
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <Header title="Change Password" />

        <View style={styles.info}>
          {/* Old Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={18} />
            <TextInput
              placeholder="Old Password"
              value={oldPass}
              onChangeText={setOldPass}
              secureTextEntry={secureOld}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setSecureOld(!secureOld)}>
              <Ionicons
                name={secureOld ? "eye-off-outline" : "eye-outline"}
                size={18}
              />
            </TouchableOpacity>
          </View>

          {/* New Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={18} />
            <TextInput
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={secureNew}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setSecureNew(!secureNew)}>
              <Ionicons
                name={secureNew ? "eye-off-outline" : "eye-outline"}
                size={18}
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={18} />
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={secureConfirm}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
              <Ionicons
                name={secureConfirm ? "eye-off-outline" : "eye-outline"}
                size={18}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.noteRow}>
            <Feather name="alert-circle" size={14} color={Colors.textLight} />
            <Text style={styles.note}>
              Password must be at least 8 characters.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={isPending}
          >
            <Text style={styles.buttonText}>
              {isPending ? "Loading..." : "Save"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  info: {
    paddingHorizontal: 18,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgInput,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 18,
    height: 48,
    gap: 8,
  },

  input: {
    flex: 1,
  },

  noteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  note: {
    fontSize: 11,
    color: Colors.textLight,
  },

  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },

  buttonText: {
    color: Colors.textInverse,
    fontWeight: "600",
  },
});