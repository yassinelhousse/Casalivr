import { Router } from "express";
import authRoutes from "./aut.routes.js";
import restaurantRoutes from "./restaurant.routes.js";
import orderRoutes from "./order.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/orders", orderRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
