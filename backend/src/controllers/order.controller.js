import * as orderService from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.user.id, req.body.items);

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
