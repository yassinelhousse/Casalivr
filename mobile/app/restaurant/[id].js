import { View, Text, ActivityIndicator, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantById } from "../../src/services/restaurant.service";
import { fetchMenu } from "../../src/services/menu.service";
import { useCartStore } from "../../src/store/cart.store";



export default function RestaurantDetails() {
  const { addItem } = useCartStore();
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  console.log("ID:", id);


  // 🔹 Restaurant query
  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => fetchRestaurantById(id),
    enabled: !!id,
  });

  // 🔹 Menu query
  const {
    data: menu,
    isLoading: menuLoading,
    error: menuError,
  } = useQuery({
    queryKey: ["menus", id],
    queryFn: () => fetchMenu(id),
    enabled: typeof id === "string",
  });

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;
  }

  if (error) {
    console.log("DETAIL ERROR:", error);
    return <Text>Error loading restaurant</Text>;
  }
  if (menuError) {
    console.log("MENU ERROR:", menuError);
  }

  console.log("MENU DATA:", menu);


  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {/* Restaurant Info */}
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        {restaurant?.name}
      </Text>
      <Text>{restaurant?.category}</Text>
      <Text>{restaurant?.area}</Text>

      {/* Menu Section */}
      <Text
        style={{
          marginTop: 24,
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        Menu
      </Text>

      {menuLoading && <ActivityIndicator style={{ marginTop: 10 }} />}

      {menu?.map((item) => (
        <View
          key={item.id}
          style={{
            marginTop: 16,
            padding: 12,
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Pressable
            onPress={() => addItem(item)}
            style={{
              marginTop: 8,
              padding: 8,
              backgroundColor: "#000",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff" }}>Add to Cart</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}
