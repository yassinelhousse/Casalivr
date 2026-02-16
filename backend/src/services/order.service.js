import { Order, OrderItem } from "../models/index.js";

export const createOrder = async (userId, items) => {
  if (!items || items.length === 0) {
    throw new Error("Cart is empty");
  }

  const order = await Order.create({
    userId,
    deliveryFee: 10,
  });

  for (const item of items) {
    await OrderItem.create({
      orderId: order.id,
      menuItemId: item.menuItemId,
      quantity: item.quantity,
    });
  }

  return order;
};

export const getMyOrders = async (userId) => {
  return Order.findAll({
    where: { userId },
    include: [OrderItem],
    order: [["createdAt", "DESC"]],
  });
};
