import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";

export default function ProductInformationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product Information Screen</Text>
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