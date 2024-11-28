const express = require("express");
const pool = require("../db/pool");
const categoriesRoutes = require("../routes/categories");
const app = express();

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

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
