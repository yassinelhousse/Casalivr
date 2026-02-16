import { Restaurant, MenuItem } from "../src/models/index.js";
import { sequelize } from "../src/models/index.js";

const run = async () => {
  await sequelize.sync();

  const r1 = await Restaurant.create({
    name: "Casa Tacos",
    category: "Street Food",
    area: "Gauthier",
  });

  const r2 = await Restaurant.create({
    name: "Sushi Anfa",
    category: "Asiatique",
    area: "Anfa",
  });

  await MenuItem.bulkCreate([
    {
      name: "Tacos poulet",
      price: 35,
      prepTime: 10,
      restaurantId: r1.id,
    },
    {
      name: "Tacos viande",
      price: 40,
      prepTime: 12,
      restaurantId: r1.id,
    },
    {
      name: "California roll",
      price: 55,
      prepTime: 15,
      restaurantId: r2.id,
    },
  ]);

  console.log("Seed done");
  process.exit();
};

run();
