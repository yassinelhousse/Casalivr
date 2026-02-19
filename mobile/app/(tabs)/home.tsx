import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Home Screen</Text>

      <Button
        title="Go to Restaurant 101"
        onPress={() => router.push("/restaurant/101")}
      />
    </View>
  );
}
