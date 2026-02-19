import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <Text>Restaurant ID: {id}</Text>
    </View>
  );
}
