import sequelize from "../config/database.js";

import User from "./User.js";
import Restaurant from "./Restaurant.js";
import MenuItem from "./MenuItem.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Courier from "./Courier.js";


// Associations


User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Restaurant.hasMany(MenuItem, { foreignKey: "restaurantId" });
MenuItem.belongsTo(Restaurant, { foreignKey: "restaurantId" });

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

MenuItem.hasMany(OrderItem, { foreignKey: "menuItemId" });
OrderItem.belongsTo(MenuItem, { foreignKey: "menuItemId" });

Courier.hasMany(Order, { foreignKey: "courierId" });
Order.belongsTo(Courier, { foreignKey: "courierId" });



export const syncDB = async () => {
  await sequelize.sync({ alter: true });
  console.log("📦 Database synced");
};

export { sequelize, User, Restaurant, MenuItem, Order, OrderItem, Courier };
