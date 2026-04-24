import { View } from "react-native";
import { Colors } from "../../../theme/colors";
import Header from "../../../components/common/Header";
import OrderTopTabs from "../../../navigation/OrderTopTab";

export default function MyOrdersScreen({ navigation, route }: any) {
  const { initialRoute } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bgSecondary }}>
      <Header title="My Orders" />

      <OrderTopTabs initialRoute={initialRoute} />
    </View>
  );
}