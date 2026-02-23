import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRestaurants } from "../../src/hooks/useRestaurants";
import { router } from "expo-router";

export default function Home() {
  const { data, isLoading, error } = useRestaurants();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error loading restaurants</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <Pressable
          style={{
            padding: 16,
            borderWidth: 1,
            borderRadius: 12,
            marginBottom: 12,
          }}
          onPress={() => router.push(`/restaurant/${item.id}`)}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
          <Text>{item.category}</Text>
        </Pressable>
      )}
    />
  );
}
