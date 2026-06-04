import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Fontisto, } from "@expo/vector-icons";
import { Colors } from "../../theme/colors";
import Header from "../../components/common/Header";
import { useState } from "react";

type ModeType = "light" | "dark" | "system";

export default function DarkModeScreen() {
  const [mode, setMode] = useState<ModeType>("light");

  const modeList = [
    { value: "light", label: "Off", },
    { value: "dark", label: "On", },
    { value: "system", label: "System", },
  ];

  return (
    <View style={styles.container}>
      <Header title="Dark Mode" />

      <View style={styles.info}>
        {modeList.map(item => (
          <TouchableOpacity
            key={item.value}
            style={styles.row}
            onPress={() => setMode(item.value as ModeType)}
          >
            {mode === item.value
              ? <Fontisto name="radio-btn-active" size={24} color={Colors.secondary} />
              : <Fontisto name="radio-btn-passive" size={24} color={Colors.textPlaceholder} />
            }
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>

        ))}

        <Text style={styles.note}>
          If you select System, Skintify will automatically adjust the interface to match the system settings on your device.
        </Text>
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
    marginTop: 18,
    paddingHorizontal: 24,
    gap: 24,
  },

  row: {
    flexDirection: "row",
    gap: 16,
  },

  label: {
    fontSize: 15
  },
  note: {
    fontSize: 12,
    color: Colors.textSecondary
  },
});