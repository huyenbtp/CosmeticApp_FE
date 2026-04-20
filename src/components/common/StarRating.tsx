import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../theme/colors";

export default function StarRating({
  rating,
  size = 12,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((i) => {
        let iconName: any = "star-outline";

        if (rating >= i) {
          iconName = "star"; // full
        } else if (rating >= i - 0.5) {
          iconName = "star-half"; // half
        }

        return (
          <Ionicons
            key={i}
            name={iconName}
            size={size}
            color={Colors.textWarning}
            style={{ marginRight: 1 }}
          />
        );
      })}
    </View>
  );
}