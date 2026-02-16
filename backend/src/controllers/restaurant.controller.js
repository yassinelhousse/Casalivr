import * as restaurantService from "../services/restaurant.service.js";

export const listRestaurants = async (req, res) => {
  try {
    const { category } = req.query;

    const restaurants = await restaurantService.getAllRestaurants(category);

    res.json(restaurants);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getMenusByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const menus = await restaurantService.getRestaurantMenus(id);

    res.json(menus);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
