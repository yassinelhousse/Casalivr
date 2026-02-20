import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: true,

  setAuth: async (user, token) => {
    await AsyncStorage.setItem("token", token);
    set({ user, token });
  },

  loadStoredAuth: async () => {
    const token = await AsyncStorage.getItem("token");
    set({ token, loading: false });
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
