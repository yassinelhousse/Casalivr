import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Courier = sequelize.define(
  "Courier",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    vehicleType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "couriers",
    timestamps: true,
  },
);

export default Courier;
