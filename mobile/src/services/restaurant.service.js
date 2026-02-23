import {api} from "../api/client";

export const fetchRestaurants = async () => {
  const res = await api.get("/restaurants");
  return res.data;
};

export const fetchRestaurantById = async (id) => {
  const res = await api.get(`/restaurants/${id}`);
  return res.data;
};
