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
    console.log("RESTAURANT ID:", req.params.id);

    const menus = await restaurantService.getRestaurantMenus(req.params.id);
    res.json(menus);
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getById = async (req, res) => {
  try {
    const restaurant = await restaurantService.getRestaurantById(req.params.id);

    res.json(restaurant);
  } catch (error) {
    if (error.message === "Restaurant not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Server error" });
  }
};