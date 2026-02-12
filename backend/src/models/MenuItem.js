export default (sequelize, DataTypes) => {
  const MenuItem = sequelize.define(
    "MenuItem",
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

      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      prepTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "menu_items",
    },
  );

  MenuItem.associate = (models) => {
    MenuItem.belongsTo(models.Restaurant, {
      foreignKey: "restaurantId",
    });
  };

  return MenuItem;
};
