import { Order, OrderItem, MenuItem, Courier } from "../models/index.js";

export const createOrder = async (userId, items) => {
  if (!items || items.length === 0) {
    throw new Error("Cart is empty");
  }

  // calculate total
  let deliveryFee = 10; 

  const order = await Order.create({
    userId,
    deliveryFee,
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

export const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByPk(orderId);
  if (!order) throw new Error("Order not found");

  order.status = status;

  // Fake courier assignment when validated
  if (status === "VALIDEE") {
    const couriers = await Courier.findAll();
    if (couriers.length > 0) {
      const random = couriers[Math.floor(Math.random() * couriers.length)];
      order.courierId = random.id;
    }
  }

  await order.save();

  return order;
};
