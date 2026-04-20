import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import MainBottomTabs from "./MainBottomTabs";
import ProductInformationScreen from "../screens/product/ProductInformationScreen";

export type RootStackParamList = {
  Onboarding: undefined
  Login: undefined
  Main: undefined
  ProductInformation: { product_id: string }
  
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator({ initialRoute = "Login" }: { initialRoute: keyof RootStackParamList }) {

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRoute}
    >
      <Stack.Screen name="Main" component={MainBottomTabs} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="ProductInformation" component={ProductInformationScreen} />

    </Stack.Navigator>
  );
}