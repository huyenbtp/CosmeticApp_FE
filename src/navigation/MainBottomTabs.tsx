import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/home/HomeScreen";
import NotificationScreen from "../screens/notification/NotificationScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import ExploreScreen from "../screens/explore/ExploreScreen";

import { Ionicons, Octicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../theme/colors";

export type MainBottomTabParamList = {
  Home: undefined
  Notification: undefined
  Profile: undefined
  Explore: undefined
}

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

export default function MainBottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textPlaceholder,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 14,
          paddingBottom: insets.bottom,
          backgroundColor: "#fff",
          elevation: 6,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: 65 + insets.bottom,
        },
      }}
    >

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Octicons
              name={focused ? "home-fill" : "home"}
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: "Notification",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Octicons
              name={focused ? "bell-fill" : "bell"}
              size={18}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />

    </Tab.Navigator>
  );
}