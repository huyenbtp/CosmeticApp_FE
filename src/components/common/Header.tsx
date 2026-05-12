import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";
import { Colors } from "../../theme/colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";
import { useCartCount } from "../../services/cart.service";

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
  const { data: totalItems = 0 } = useCartCount();
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
            <Feather name="shopping-cart" size={24} />

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
    top: -6,
    right: -8,
    backgroundColor: Colors.bgError,
    borderRadius: 10,
    paddingHorizontal: 4,
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.background
  },

  badgeText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "600",
  },
})