import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    status: {
      type: DataTypes.ENUM("EN_ATTENTE", "VALIDEE", "LIVREE"),
      defaultValue: "EN_ATTENTE",
    },

    deliveryFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  },
);

export default Order;
