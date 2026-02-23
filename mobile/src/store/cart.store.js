import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCartStore = create((set, get) => ({
  items: [],

  addItem: async (item) => {
    const existing = get().items.find((i) => i.id === item.id);

    let updated;

    if (existing) {
      updated = get().items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
    } else {
      updated = [...get().items, { ...item, quantity: 1 }];
    }

    set({ items: updated });
    await AsyncStorage.setItem("cart", JSON.stringify(updated));
  },

  removeItem: async (id) => {
    const updated = get().items.filter((i) => i.id !== id);
    set({ items: updated });
    await AsyncStorage.setItem("cart", JSON.stringify(updated));
  },

  clearCart: async () => {
    set({ items: [] });
    await AsyncStorage.removeItem("cart");
  },

  loadCart: async () => {
    const stored = await AsyncStorage.getItem("cart");
    if (stored) {
      set({ items: JSON.parse(stored) });
    }
  },
}));
