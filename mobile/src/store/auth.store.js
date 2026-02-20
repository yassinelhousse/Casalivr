import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api/client";

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

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      await AsyncStorage.setItem("token", res.data.token);

      set({
        user: res.data.user,
        token: res.data.token,
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Login failed",
      });
      return false;
    }
  },

  // 📝 REGISTER
  register: async (name, email, password) => {
    try {
      set({ loading: true, error: null });

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      await AsyncStorage.setItem("token", res.data.token);

      set({
        user: res.data.user,
        token: res.data.token,
        loading: false,
      });

      return true;
    } catch (err) {
      console.log("Register error:", err.response?.data || err.message);
      set({
        loading: false,
        error: err.response?.data?.message || "Register failed",
      });
      return false;
    }
  },

  // 🚪 LOGOUT
  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({ user: null, token: null });
  },

  // 🔄 LOAD TOKEN ON APP START
  loadStoredAuth: async () => {
    const token = await AsyncStorage.getItem("token");
    set({ token, loading: false });
  },
}));
