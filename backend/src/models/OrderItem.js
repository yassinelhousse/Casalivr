export default (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "order_items",
    },
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: "orderId" });
    OrderItem.belongsTo(models.MenuItem, { foreignKey: "menuItemId" });
  };

  return OrderItem;
};
