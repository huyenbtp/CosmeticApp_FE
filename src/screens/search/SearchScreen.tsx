import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, } from "react-native";
import { Colors } from "../../theme/colors";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { useEffect, useState } from "react";
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
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" size={24} />
            </TouchableOpacity>

            <SearchBar onSearch={() => { }} />
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
              <TouchableOpacity style={styles.item} onPress={() => handleDeleteItem(item._id)}>
                <Text style={styles.itemText}>
                  {item.keyword}
                </Text>
                <Feather name="x" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
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