import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppNavigation } from "../../navigation/useAppNavigation";

export default function OnboardingScreen() {
  const navigation = useAppNavigation();

  const handleStart = async () => {
    await AsyncStorage.setItem("isFirstLaunch", "true");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      <Text>Khám phá các sản phẩm mỹ phẩm chất lượng</Text>

      <Button title="Bắt đầu" onPress={handleStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  }
});