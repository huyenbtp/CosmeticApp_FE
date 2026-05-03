import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavigator, { RootStackParamList } from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartProvider } from "./src/providers/CartProvider";
import { ToastProvider } from "./src/providers/ToastProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { refreshAccessToken, validateToken } from "./src/utils/authUtils";

const queryClient = new QueryClient();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | null
  >(null);

  const initApp = async () => {
    const isFirstLaunch = await AsyncStorage.getItem("isFirstLaunch");

    if (isFirstLaunch === null) {
      await AsyncStorage.setItem("isFirstLaunch", "false");
      return setInitialRoute("Onboarding");
    }

    const accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    if (accessToken) {
      const isValid = await validateToken(accessToken);
      if (isValid) {
        return setInitialRoute("Main");
      }
    }

    if (refreshToken) {
      const newTokens = await refreshAccessToken(refreshToken);
      if (newTokens) {
        await AsyncStorage.setItem("access_token", newTokens.access_token);
        return setInitialRoute("Main");
      }
    }

    setInitialRoute("Login");
  };

  useEffect(() => {
    initApp();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ToastProvider>
          <CartProvider>
            <NavigationContainer>
              <AppNavigator initialRoute={initialRoute} />
            </NavigationContainer>
          </CartProvider>
        </ToastProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}