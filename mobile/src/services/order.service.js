import {api} from "../api/client";

export const createOrder = async (items) => {
  const res = await api.post("/orders", {
    items: items.map((item) => ({
      menuItemId: item.id,
      quantity: item.quantity,
    })),
  });

  return res.data;
};

export const fetchMyOrders = async () => {
  const res = await api.get("/orders/me");
  return res.data;
};
