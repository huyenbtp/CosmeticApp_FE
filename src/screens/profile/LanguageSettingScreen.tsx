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

type ModeType = "english" | "vietnamese";

export default function LanguageSettingScreen() {
  const [mode, setMode] = useState<ModeType>("english");

  const modeList = [
    { value: "english", label: "English", },
    { value: "vietnamese", label: "Tiếng Việt", },
  ];

  return (
    <View style={styles.container}>
      <Header title="Language Setting" />

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
  
});