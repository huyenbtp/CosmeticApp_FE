import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Colors } from "../../theme/colors";
import { Feather, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../navigation/useAppNavigation";

export default function ProfileScreen() {
  const navigation = useAppNavigation();

  const username = "ikikasumi";   //fake

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        {/** Header*/}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{username}</Text>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate("Cart")}>
            <Ionicons name="cart-outline" size={24} />
          </TouchableOpacity>
        </View>

        {/** My Orders*/}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>My Orders</Text>

            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => navigation.navigate("MyOrders", { initialRoute: "All Orders" })}
            >
              <Text style={styles.viewAllText}>View all</Text>
              <Ionicons name="chevron-forward" size={15} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyOrders", { initialRoute: "Pending" })}>
              <MaterialIcons name="hourglass-empty" size={30} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyOrders", { initialRoute: "Confirmed" })}>
              <Octicons name="checklist" size={30} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Confirmed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyOrders", { initialRoute: "Shipping" })}>
              <Feather name="truck" size={30} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Shipping</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyOrders", { initialRoute: "Delivered" })}>
              <MaterialCommunityIcons name="star-circle-outline" size={30} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Delivered</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/** Account Information*/}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ProfileInformation")}>
              <FontAwesome6 name="user-circle" size={30} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Personal Information</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddressList")}>
              <FontAwesome6 name="map-location-dot" size={30} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Shipping Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="heart-outline" size={30} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <MaterialCommunityIcons name="history" size={30} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>View History</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/** General*/}
        <View style={[styles.section, { paddingBottom: 24 }]}>
          <Text style={styles.sectionTitle}>General</Text>

          <TouchableOpacity style={styles.row}>
            <View style={styles.row}>
              <Feather name="unlock" size={20} style={styles.buttonIcon} />
              <Text style={styles.generalItemText}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={15} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={styles.row}>
              <Octicons name="bell" size={20} style={styles.buttonIcon} />
              <Text style={styles.generalItemText}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={15} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={styles.row}>
              <Feather name="moon" size={20} style={styles.buttonIcon} />
              <Text style={styles.generalItemText}>Dark Mode</Text>
            </View>
            <Ionicons name="chevron-forward" size={15} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={styles.row}>
              <MaterialIcons name="language" size={20} style={styles.buttonIcon} />
              <Text style={styles.generalItemText}>Language</Text>
            </View>
            <Ionicons name="chevron-forward" size={15} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/** Log out*/}
        <TouchableOpacity style={styles.logoutButton}>
          <Feather name="log-out" size={20} />
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgSecondary,
  },

  infoContainer: {
    gap: 14,
    paddingBottom: 24,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 20,
    backgroundColor: Colors.card,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: Colors.text,
  },

  section: {
    backgroundColor: Colors.card,
    padding: 18,
    gap: 30,
  },
  sectionTitle: {
    fontWeight: 600,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  viewAllButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
  },
  viewAllText: {
    fontWeight: "600",
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },

  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  buttonIcon: {
    color: Colors.textSecondary
  },
  buttonText: {
    fontSize: 10,
    color: Colors.textLight,
    textAlign: "center"
  },

  generalItemText: {
    fontSize: 12,
    color: Colors.textSecondary
  },

  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    gap: 10,
    backgroundColor: Colors.card,
  },
});