import { View, Text, Pressable, Alert } from "react-native";
import { useCartStore } from "../../src/store/cart.store";
import { createOrder } from "../../src/services/order.service";
import { useRouter } from "expo-router";

import { useAuthStore } from "../../src/store/auth.store";
export default function CartScreen() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();

  const handleOrder = async () => {
    if (items.length === 0) {
      return Alert.alert("Cart is empty");
    }
    console.log("TOKEN:", useAuthStore.getState().token);

    try {
      await createOrder(items);
      clearCart();

      Alert.alert("✅ Order created");
      router.push("/(tabs)/orders");
    } catch (error) {
      console.log(error);
      Alert.alert("❌ Order failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {items.map((item) => (
        <Text key={item.id}>
          {item.name} x {item.quantity}
        </Text>
      ))}

      <Pressable
        onPress={handleOrder}
        style={{
          marginTop: 20,
          backgroundColor: "black",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Confirm Order
        </Text>
      </Pressable>
    </View>
  );
}
