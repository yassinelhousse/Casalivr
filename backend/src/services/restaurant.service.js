import { Restaurant, MenuItem } from "../models/index.js";

export const getAllRestaurants = async (category) => {
  const where = category ? { category } : {};

  return Restaurant.findAll({
    where,
    order: [["name", "ASC"]],
  });
};

export const getRestaurantMenus = async (restaurantId) => {
  return MenuItem.findAll({
    where: { restaurantId },
    order: [["name", "ASC"]],
  });
};

export const getRestaurantById = async (id) => {
  const restaurant = await Restaurant.findByPk(id);

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return restaurant;
};