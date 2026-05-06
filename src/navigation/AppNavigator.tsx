import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import MainBottomTabs from "./MainBottomTabs";
import ProductInformationScreen from "../screens/product/ProductInformationScreen";
import ReviewListScreen from "../screens/review/ReviewList";
import BrandProductsScreen from "../screens/explore/BrandProducts";
import FilterScreen, { IFilter } from "../screens/explore/FilterScreen";
import CartScreen from "../screens/cart/CartScreen";
import CategoryProductsScreen from "../screens/explore/CategoryProducts";
import ProfileInformationScreen from "../screens/profile/ProfileInformationScreen";
import AddressListScreen from "../screens/profile/AddressListScreen";
import MyOrdersScreen from "../screens/order/MyOrders/MyOrdersScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EditProfileScreen from "../screens/profile/EditProfile";
import SearchScreen from "../screens/search/SearchScreen";
import SearchResultScreen from "../screens/search/SearchResultScreen";
import OrderInformationScreen from "../screens/order/OrderInformation/OrderInformation";
import ShippingInformationScreen from "../screens/order/OrderInformation/ShippingInformationScreen";
import CheckoutScreen from "../screens/order/Checkout/CheckoutScreen";
import { IUserAddress } from "../types/userAddress";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ProductViewHistoryScreen from "../screens/profile/ViewHistoryScreen";
import WishlistScreen from "../screens/profile/WishlistScreen";
import ProductDescriptionScreen from "../screens/product/ProductDescriptionScreen";

export type RootStackParamList = {
  AddressList: { withCheckbox?: boolean, selectedAddressId?: string }
  BrandProducts: { brand_id: string }
  Cart: undefined
  CategoryProducts: { category_id: string }
  ChangePassword: undefined
  Checkout: { address?: IUserAddress };
  EditProfile: undefined
  Filter: { currentFilter: IFilter, handleApply: (filter: IFilter) => void }
  Login: undefined
  Main: undefined
  MyOrders: { initialRoute: string }
  Onboarding: undefined
  OrderInformation: { order_id: string }
  ProductDescription: { data: any }
  ProductInformation: { product_id: string }
  ProfileInformation: undefined
  Register: undefined
  ReviewList: { product_id: string }
  Search: undefined
  SearchResults: { keyword: string }
  ShippingInformation: { order_id: string }
  ViewHistory: undefined
  Wishlist: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator({ initialRoute = "Login" }: { initialRoute: keyof RootStackParamList }) {

  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          marginTop: insets.top,
          marginBottom: insets.bottom
        }
      }}
      initialRouteName={initialRoute}
    >
      <Stack.Screen name="Main" component={MainBottomTabs} />

      <Stack.Screen name="AddressList" component={AddressListScreen} />
      <Stack.Screen name="BrandProducts" component={BrandProductsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Filter" component={FilterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="OrderInformation" component={OrderInformationScreen} />
      <Stack.Screen name="ShippingInformation" component={ShippingInformationScreen} />
      <Stack.Screen name="ProductDescription" component={ProductDescriptionScreen} />
      <Stack.Screen name="ProductInformation" component={ProductInformationScreen} />
      <Stack.Screen name="ProfileInformation" component={ProfileInformationScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ReviewList" component={ReviewListScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultScreen} />
      <Stack.Screen name="ViewHistory" component={ProductViewHistoryScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
    </Stack.Navigator>
  );
}