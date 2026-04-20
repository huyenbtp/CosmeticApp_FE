import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CategoryTab from "../screens/explore/CategoryTab";
import BrandTab from "../screens/explore/BrandTab";
import { Colors } from "../theme/colors";

const Tab = createMaterialTopTabNavigator();

export default function ExploreTopTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { 
          fontWeight: 700 
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primary,
          marginHorizontal: 60
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: {
          backgroundColor: Colors.background,
          elevation: 0
        },
      }}
    >
      <Tab.Screen name="Category" component={CategoryTab} />
      <Tab.Screen name="Brand" component={BrandTab} />
    </Tab.Navigator>
  );
}