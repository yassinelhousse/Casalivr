import { Router } from "express";
import * as orderController from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";
// import { authorize } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/", protect, orderController.createOrder);

router.get("/me",protect, orderController.myOrders);

router.patch(
  "/:id/status",
    protect,

);

export default router;
