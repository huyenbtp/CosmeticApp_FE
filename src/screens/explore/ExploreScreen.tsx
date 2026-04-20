import { View } from "react-native";
import ExploreTopTabs from "../../navigation/ExploreTopTabs";
import { Colors } from "../../theme/colors";

export default function ExploreScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, paddingTop: 48,}}>
      <ExploreTopTabs />
    </View>
  );
}