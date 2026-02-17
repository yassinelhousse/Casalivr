import { Router } from "express";
import {createOrder,getMyOrders,updateStatus}  from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";
// import { authorize } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/", protect, createOrder);

router.get("/me",protect, getMyOrders);

router.patch(
  "/:id/status",
    protect, updateStatus

);

export default router;
