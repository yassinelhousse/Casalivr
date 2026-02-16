import * as orderService from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.user.id, req.body.items);

    res.status(201).json(order);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const myOrders = async (req, res) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);
    res.json(orders);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await orderService.updateOrderStatus(req.params.id, status);

    res.json(order);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
