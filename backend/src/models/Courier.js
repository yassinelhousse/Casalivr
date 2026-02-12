export default (sequelize, DataTypes) => {
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
    },
  );

  Courier.associate = (models) => {
    Courier.hasMany(models.Order, { foreignKey: "courierId" });
  };

  return Courier;
};
