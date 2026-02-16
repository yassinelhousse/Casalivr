import { Router } from "express";
import * as restaurantController from "../controllers/restaurant.controller.js";

const router = Router();

router.get("/", restaurantController.listRestaurants);
router.get("/:id/menus", restaurantController.getMenusByRestaurant);

export default router;
