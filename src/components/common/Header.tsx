import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";
import { Colors } from "../../theme/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";


export default function Header({
  title = "",
  hasSearchBar = false,
  hasGoBack = true,
  hasCart = false
}: {
  title?: string,
  hasSearchBar?: boolean
  hasGoBack?: boolean
  hasCart?: boolean
}) {

  const navigation = useAppNavigation();

  return (
    <View style={styles.headerContainer}>
      {hasGoBack &&
        <View style={{ flexDirection: "row", alignItems: "center", gap: 18 }}>
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={24} />
          </TouchableOpacity>

          {title &&
            <Text style={styles.title}>{title}</Text>
          }
        </View>
      }

      {hasSearchBar &&
        <TouchableOpacity style={styles.searchBar}>
          <Feather name="search" size={20} color={Colors.textPlaceholder} />
          <Text style={styles.placeholder}>Search products</Text>
        </TouchableOpacity>
      }

      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {hasCart &&
          <TouchableOpacity style={{}} onPress={() => navigation.navigate("Cart")}>
            <Ionicons name="cart-outline" size={24} />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 45,
    paddingBottom: 12,
    backgroundColor: Colors.background,
    gap: 10,
  },
  title: {
    fontWeight: 700,
    fontSize: 16,
  },
  searchBar: {
    height: 48,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
    backgroundColor: Colors.background,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 30,
    elevation: 2,
  },
  placeholder: {
    color: Colors.textPlaceholder
  },
})