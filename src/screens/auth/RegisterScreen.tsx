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
import { Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../theme/colors";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { Gender } from "../profile/EditProfile";
import { useToast } from "../../providers/ToastProvider";
import { useRegister } from "../../services/auth.service";
import DatePicker from "../../components/common/DatePicker";

export default function RegisterScreen() {
  const navigation = useAppNavigation();
  const { showMessage } = useToast();

  //const [username, setUsername] = useState("");
  const [full_name, setFullName] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);

  const { mutate, isPending } = useRegister();

  const handleRegister = async () => {

    if (!full_name || !phone || !email || !password || !confirmPassword) {
      return showMessage("Please fill all required fields", "warning");
    }

    if (!full_name.trim()) {
      return showMessage('Full name is required', "warning");
    }

    if (phone !== undefined) {
      const phoneRegex = /^(0|\+84)[0-9]{9}$/;
      if (!phoneRegex.test(phone)) {
        return showMessage('Invalid phone number', "warning");
      }
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return showMessage("Invalid email format", "warning");
    }

    /*
    if (!username.trim()) {
      return showMessage('Username is required', "warning");
    }

    if (username.length < 4 || /\s/.test(username)) {
      return showMessage('Username must be at least 4 characters and contain no spaces', "warning");
    }
    */

    if (password.length < 8) {
      return showMessage("Password must be at least 8 characters", "warning");
    }

    if (password !== confirmPassword) {
      return showMessage("Passwords do not match", "warning");
    }

    mutate(
      {
        full_name,
        gender,
        dob,
        phone,
        email,
        password,
      },
      {
        onSuccess: () => {
          showMessage("Registered successfully!");
          navigation.replace("Login");
        },
        onError: (error: any) => {
          showMessage(error.response?.data.message, "error")
          console.log("err: " + error.message);
          
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
        {/* Title */}
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        {/* Full name */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={18} />
          <TextInput
            placeholder="Full name"
            value={full_name}
            onChangeText={setFullName}
            style={styles.input}
          />
        </View>

        {/* Gender */}
        <View>
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

        {/* Date of Birth */}
        <View style={[styles.inputContainer, { gap: 0 }]}>
          <Ionicons name="calendar-clear-outline" size={18} />
          <DatePicker
            placeholder="Date of Birth"
            date={dob}
            setDate={setDob}
            maximumDate={new Date()}
          />
        </View>

        {/* Phone */}
        <View style={styles.inputContainer}>
          <Feather name="phone" size={18} />
          <TextInput
            keyboardType="numeric"
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={18} />
          <TextInput
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        {/* Username */}
        {/*
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={18} />
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>
        */}

        {/* Password */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={18} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure1}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setSecure1(!secure1)}>
            <Ionicons
              name={secure1 ? "eye-off-outline" : "eye-outline"}
              size={18}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm password */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={18} />
          <TextInput
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secure2}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setSecure2(!secure2)}>
            <Ionicons
              name={secure2 ? "eye-off-outline" : "eye-outline"}
              size={18}
            />
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={isPending}
        >
          <Text style={styles.buttonText}>
            {isPending ? "Loading..." : "Register"}
          </Text>
        </TouchableOpacity>

        {/* Login */}
        <View style={styles.row}>
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text style={styles.link}> Login</Text>
          </TouchableOpacity>
        </View>
      </View >
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

  genderRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 12,
    marginBottom: 24,
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

  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  text: {
    color: Colors.textSecondary,
  },

  link: {
    color: Colors.primary,
    fontWeight: "600",
  },

  error: {
    color: Colors.secondary600,
    marginBottom: 8,
    fontSize: 12,
  },
});