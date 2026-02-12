export default (sequelize, DataTypes) => {
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
    },
  );

  Restaurant.associate = (models) => {
    Restaurant.hasMany(models.MenuItem, {
      foreignKey: "restaurantId",
    });
  };

  return Restaurant;
};
