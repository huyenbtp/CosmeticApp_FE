import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { Colors } from "../../theme/colors";
import { Feather } from "@expo/vector-icons";

export default function MailSentScreen({ route }: any) {
  const { type } = route.params;
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <Feather name="send" size={72} color={Colors.secondary300} />

      <Text style={styles.title}>
        {type === "verify"
          ? "We have sent you an email for verification"
          : type === "forgot_password"
            ? "We have sent you an email to reset your password"
            : ""
        }
      </Text>

      <Text style={styles.message}>Please check your mail to continue</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.replace("Login")
        }
      >
        <Text style={styles.buttonText}>
          Return to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    backgroundColor: Colors.background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  message: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 10,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 40,
    borderRadius: 30,
    backgroundColor: Colors.primary
  },
  buttonText: {
    fontWeight: "500",
    color: Colors.textInverse,
  },
});