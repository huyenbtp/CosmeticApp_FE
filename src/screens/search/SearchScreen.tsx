import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, } from "react-native";
import { Colors } from "../../theme/colors";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import SearchBar from "../../components/common/SearchBar";

export default function SearchScreen() {
  const navigation = useAppNavigation();

  const history = [
    { _id: "1", keyword: "cleanser" },
    { _id: "2", keyword: "sun protection" },
    { _id: "3", keyword: "hyarulonic paper mask" },
  ]

  const handleDeleteHistory = () => {

  };

  const handleDeleteItem = (id: string) => {

  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" size={24} />
            </TouchableOpacity>

            <SearchBar onSearch={(q) => { navigation.navigate("SearchResults", { keyword: q }) }} />
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.item}>
              <Text style={styles.label}>
                Search history
              </Text>
              <TouchableOpacity onPress={handleDeleteHistory}>
                <Text style={styles.deleteButton}>Delete history</Text>
              </TouchableOpacity>
            </View>

            {history.map((item) => (
              <View key={item._id} style={styles.item}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => navigation.navigate(
                    "SearchResults",
                    { keyword: item.keyword }
                  )}
                >
                  <Text style={styles.itemText}>
                    {item.keyword}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDeleteItem(item._id)}>
                  <Feather name="x" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 30,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: Colors.background,
    gap: 10,
  },

  bodyContainer: {
    paddingHorizontal: 14,
    paddingVertical: 20,
    gap: 20,
    borderBottomWidth: 1,
    borderColor: Colors.divider
  },
  label: {
    fontWeight: 700,
    fontSize: 14,
  },
  deleteButton: {
    fontWeight: 500,
    fontSize: 12,
    color: Colors.textLight,
    textDecorationLine: "underline",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
  },
  itemText: {
    fontWeight: 300,
  }
});