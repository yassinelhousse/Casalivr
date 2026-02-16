import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Restaurant = sequelize.define(
  "Restaurant",
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

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "restaurants",
    timestamps: true,
  },
);

export default Restaurant;
