import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAppNavigation } from "../../../navigation/useAppNavigation";
import { Colors } from "../../../theme/colors";
import { Feather } from "@expo/vector-icons";

export default function OrderSuccess({ route }: any) {
  const { order_id } = route.params;
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Feather name="check-circle" size={72} color={Colors.bgSuccess}/>
        <Text style={styles.title}>Order Placed Successfully</Text>
        <Text style={styles.message}>Thank you for your purchase</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: Colors.primary
          }
        ]}
        onPress={() =>
          navigation.replace("OrderInformation", { order_id })
        }
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: Colors.textInverse,
            }
          ]}
        >
          See Order details
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderWidth: 1,
            borderColor: Colors.primary,
          }
        ]}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" size={16} />
        <Text
          style={[
            styles.buttonText,
            {
              color: Colors.primary700
            }
          ]}
        >
          Go Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 160,
    paddingBottom: 40,
    backgroundColor: Colors.background
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 24,
  },
  message: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 10,
  },
  button: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 16,
    marginTop: 16,
    borderRadius: 30,
  },
  buttonText: {
    fontWeight: "600",
  },
});