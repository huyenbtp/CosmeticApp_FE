import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, } from "react-native";
import { Colors } from "../../theme/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { useState } from "react";


export default function SearchBar({
  onSearch
}: {
  onSearch: (q: string) => void
}) {

  const navigation = useAppNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.focused
      ]}
    >
      <Feather name="search" size={20} color={Colors.textPlaceholder} />

      <TextInput
        id="input"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search products"
        placeholderTextColor={Colors.textPlaceholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
      />

      {searchQuery && (
        <TouchableOpacity style={styles.searchButton} onPress={() => onSearch(searchQuery)}>
          <Text style={styles.searchBtnText}>Find</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1,
    paddingLeft: 16,
    paddingRight: 2,
    gap: 12,
    backgroundColor: Colors.card,
    borderColor: Colors.secondary200,
    borderWidth: 1,
    borderRadius: 30,
    boxShadow: `0px 0px 0px 4px ${Colors.secondary50}`,
  },
  focused: {
    boxShadow: `0px 0px 0px 4px ${Colors.secondary100}`,
  },

  input: {
    flex: 1,
  },

  searchButton: {
    width: 70,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    borderRadius: 30,
  },
  searchBtnText: {
    color: Colors.textInverse,
    fontSize: 12,
    fontWeight: 500
  }
})