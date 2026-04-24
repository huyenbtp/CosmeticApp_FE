import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "../theme/colors";
import AllTab from "../screens/order/MyOrders/tabs/AllTab";
import PendingTab from "../screens/order/MyOrders/tabs/PendingTab";
import ConfirmedTab from "../screens/order/MyOrders/tabs/ConfirmedTab";
import ShippingTab from "../screens/order/MyOrders/tabs/ShippingTab";
import DeliveredTab from "../screens/order/MyOrders/tabs/DeliveredTab";
import CancelledTab from "../screens/order/MyOrders/tabs/CancelledTab";

const Tab = createMaterialTopTabNavigator();

export default function OrderTopTabs({ initialRoute }: { initialRoute: string }) {
  return (
    <Tab.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        tabBarLabelStyle: {
          fontWeight: 500
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primary,
          marginHorizontal: 12,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 3.5
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.background,
          elevation: 0
        },
        tabBarItemStyle: {
          width: "auto",
          paddingHorizontal: 18,
        },
        sceneStyle: {
          backgroundColor: Colors.bgSecondary,
          padding: 16,
          gap: 12,
        },
        tabBarScrollEnabled: true
      }}
    >
      <Tab.Screen name="All Orders" component={AllTab} />
      <Tab.Screen name="Pending" component={PendingTab} />
      <Tab.Screen name="Confirmed" component={ConfirmedTab} />
      <Tab.Screen name="Shipping" component={ShippingTab} />
      <Tab.Screen name="Delivered" component={DeliveredTab} />
      <Tab.Screen name="Cancelled" component={CancelledTab} />
    </Tab.Navigator>
  );
}