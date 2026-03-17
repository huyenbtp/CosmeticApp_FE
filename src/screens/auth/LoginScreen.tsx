import { Button, View, Text, StyleSheet } from "react-native";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../theme/colors";

export default function LoginScreen() {
  const navigation = useAppNavigation();

  const handleLogin = async () => {
    await AsyncStorage.setItem("authToken", "authToken"); //giả lập
    navigation.replace("Main");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
      <Button
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 20,
  },
});