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
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../theme/colors";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { useToast } from "../../providers/ToastProvider";
import { useLogin } from "../../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const navigation = useAppNavigation();
  const { showMessage } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  //const [loading, setLoading] = useState(false);

  const { mutate, isPending } = useLogin();

  const handleLogin = async () => {
    if (!email || !password) return;

    mutate(
      { email, password },
      {
        onSuccess: async (data) => {
          // lưu token
          await AsyncStorage.setItem("access_token", data.access_token);
          await AsyncStorage.setItem("refresh_token", data.refresh_token);
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
          console.log("access_token:" + data.access_token);
          console.log("refresh_token:" + data.refresh_token);
          console.log("user:" + data.user);
          navigation.replace("Main");
        },
        onError: (error: any) => {
          showMessage(error.response?.data.message, "error")
        }
      }
    );

    /*
    try {
      setLoading(true);

      // 🔥 gọi API login
      // const res = await api.post("/auth/login", { email, password });

      // giả lập
      await new Promise((r) => setTimeout(r, 1000));

      // lưu token
      // await AsyncStorage.setItem("authToken", res.data.token);

      navigation.replace("Main");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
      */
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Welcome to Skintify</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={18} />
          <TextInput
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={18} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={18}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          style={{ alignSelf: "flex-end" }}
        >
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isPending}
        >
          <Text style={styles.buttonText}>
            {isPending ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Register */}
        <View style={styles.row}>
          <Text style={styles.text}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}> Register</Text>
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
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },

  subtitle: {
    color: Colors.textSecondary,
    marginBottom: 24,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bgInput,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
    height: 48,
    gap: 8,
  },

  input: {
    flex: 1,
  },

  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  text: {
    color: Colors.textSecondary,
  },

  link: {
    color: Colors.primary,
    fontWeight: "600",
  },
});