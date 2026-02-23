import { View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchMyOrders } from "../../src/services/order.service";

export default function OrdersScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchMyOrders,
  });

  if (isLoading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <View style={{ padding: 20 }}>
      {data?.map((order) => (
        <View
          key={order.id}
          style={{
            marginBottom: 16,
            padding: 12,
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            Order #{order.id.slice(0, 6)}
          </Text>
          <Text>Status: {order.status}</Text>
          <Text>Delivery Fee: {order.deliveryFee} MAD</Text>
        </View>
      ))}
    </View>
  );
}
