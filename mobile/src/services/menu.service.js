import {api} from "../api/client";

export const fetchMenu = async (restaurantId) => {
  const res = await api.get(`/restaurants/${restaurantId}/menus`);
  return res.data;
};
