const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Categories and Items Data
const categories = ["Toyota", "Ford", "Honda", "Chevrolet", "BMW"];
const items = [
  { name: "Corolla", year: 2020, price: 20000, category_name: "Toyota" },
  { name: "Camry", year: 2021, price: 25000, category_name: "Toyota" },
  { name: "Mustang", year: 2022, price: 55000, category_name: "Ford" },
  { name: "F-150", year: 2019, price: 30000, category_name: "Ford" },
  { name: "Civic", year: 2020, price: 21000, category_name: "Honda" },
  { name: "Accord", year: 2021, price: 27000, category_name: "Honda" },
  { name: "Silverado", year: 2022, price: 40000, category_name: "Chevrolet" },
  { name: "Tahoe", year: 2023, price: 55000, category_name: "Chevrolet" },
  { name: "3 Series", year: 2021, price: 41000, category_name: "BMW" },
  { name: "X5", year: 2022, price: 60000, category_name: "BMW" },
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await pool.query("DELETE FROM items");
    await pool.query("DELETE FROM categories");

    // Insert categories and store their IDs
    const categoryIds = {};
    for (const name of categories) {
      const result = await pool.query(
        "INSERT INTO categories (name) VALUES ($1) RETURNING id",
        [name]
      );
      categoryIds[name] = result.rows[0].id;
    }

    // Insert items using the category IDs
    for (const item of items) {
      await pool.query(
        "INSERT INTO items (name, year, price, category_id) VALUES ($1, $2, $3, $4)",
        [item.name, item.year, item.price, categoryIds[item.category_name]]
      );
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await pool.end(); // Close the database connection
  }
};

seedDatabase();
