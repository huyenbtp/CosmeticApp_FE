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
import { Colors } from "../../theme/colors";
import { useToast } from "../../providers/ToastProvider";
import { useForgotPassword } from "../../services/auth.service";
import Header from "../../components/common/Header";
import { useAppNavigation } from "../../navigation/useAppNavigation";

export default function ForgotPasswordScreen() {
  const navigation = useAppNavigation();
  const { showMessage } = useToast();

  const [email, setEmail] = useState("");

  const { mutate, isPending } = useForgotPassword();

  const handleSubmit = async () => {
    if (!email.trim()) {
      return showMessage("Please enter your email", "warning");
    };

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return showMessage("Invalid email format", "warning");
    }

    mutate(
      { email },
      {
        onSuccess: async (data) => {
          navigation.replace("MailSent", { type: "forgot_password" });
        },
        onError: (error: any) => {
          showMessage(error.response?.data.message, "error")
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
        <Header title="Forgot Password" />

        <View style={styles.info}>
          {/* Email */}
          <View style={{ marginBottom: "auto" }}>
            <Text style={styles.guide}>
              Enter your email to receive a reset password link.
            </Text>
            <TextInput
              keyboardType="email-address"
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              style={styles.inputContainer}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={isPending}
          >
            <Text style={styles.buttonText}>
              {isPending ? "Loading..." : "Send Mail"}
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
    flex: 1,
    padding: 18,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgInput,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    gap: 8,
  },

  guide: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16
  },

  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: Colors.textInverse,
    fontWeight: "600",
  },
});