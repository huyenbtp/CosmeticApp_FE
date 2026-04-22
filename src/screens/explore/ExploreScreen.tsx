import { View } from "react-native";
import ExploreTopTabs from "../../navigation/ExploreTopTabs";
import { Colors } from "../../theme/colors";
import Header from "../../components/common/Header";

export default function ExploreScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header hasGoBack={false} hasSearchBar hasCart />
      
      <ExploreTopTabs />
    </View>
  );
}