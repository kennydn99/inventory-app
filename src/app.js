const express = require("express");
const path = require("node:path");
const pool = require("../db/pool");
const categoriesRoutes = require("../routes/categories");
const itemRoutes = require("../routes/items");

const app = express();

// Set view engine
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.json()); // Parse JSON requests

// Test route
app.get("/", (req, res) => {
  res.send("Inventory App is running!");
});

// Test database query
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Database connection failed");
  }
});

app.use("/categories", categoriesRoutes);
app.use("/items", itemRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
