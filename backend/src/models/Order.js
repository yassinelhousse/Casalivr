export default (sequelize, DataTypes) => {
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
    },
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "userId" });
    Order.belongsTo(models.Courier, { foreignKey: "courierId" });

    Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
  };

  return Order;
};
