import { Order, OrderItem ,Courier} from "../models/index.js";


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

export const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByPk(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  const validStatuses = ["pending", "preparing", "ready", "delivered"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status");
  }
  order.status = status;
  //fake courier

    if (status === "vvalidee") {
      const courier = await Courier.findAll();

        if (courier.length > 0) {
          const randomIndex = Math.floor(Math.random() * courier.length);
          const assignedCourier = courier[randomIndex];
          order.courierId = assignedCourier.id;
        }
    }
    await order.save();
   return order;
}
