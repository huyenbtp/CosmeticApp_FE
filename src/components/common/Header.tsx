import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";
import { Colors } from "../../theme/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { useCart } from "../../providers/CartProvider";

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
  const { totalItems } = useCart();
  const navigation = useAppNavigation();

  return (
    <View style={styles.headerContainer}>
      {(hasGoBack || title) &&
        <View style={{ flexDirection: "row", alignItems: "center", gap: 18 }}>
          {hasGoBack &&
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" size={24} />
            </TouchableOpacity>
          }

          {title &&
            <Text style={styles.title}>{title}</Text>
          }
        </View>
      }

      {hasSearchBar &&
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate("Search")}
        >
          <Feather name="search" size={20} color={Colors.textPlaceholder} />
          <Text style={styles.placeholder}>Search products</Text>
        </TouchableOpacity>
      }

      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {hasCart &&
          <TouchableOpacity style={{}} onPress={() => navigation.navigate("Cart")}>
            <Ionicons name="cart-outline" size={24} />

            {totalItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {totalItems}
                </Text>
              </View>
            )}
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
    paddingTop: 12,
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
    borderColor: Colors.secondary300,
    borderWidth: 1,
    borderRadius: 30,
  },
  placeholder: {
    color: Colors.textPlaceholder
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: Colors.bgError,
    borderRadius: 10,
    paddingHorizontal: 5,
    minWidth: 16,
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
})