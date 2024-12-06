const pool = require("../db/pool");

const getAllItems = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM items");
    return rows;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createItem = async ({ name, year, price, category_id }) => {
  try {
    await pool.query(
      "INSERT INTO items (name, year, price, category_id) VALUES ($1, $2, $3, $4)",
      [name, year, price, category_id]
    );
  } catch (err) {
    console.error("Error in createItem:", err);
    throw new Error("Error creating item");
  }
};

const getItemById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT items.id, items.name, items.year, items.price, items.category_id, categories.name AS category_name 
       FROM items 
       JOIN categories ON items.category_id = categories.id 
       WHERE items.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return null; // Return null if the item is not found
    }

    return result.rows[0]; // Return the found item
  } catch (error) {
    console.error("Error in getItemById:", error);
    throw new Error("Error retrieving item"); // Throw error to be handled by the caller
  }
};

const getItemsByCategory = async (categoryId) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM items WHERE category_id = $1",
      [categoryId]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Database error");
  }
};

const updateItem = async (id, { name, year, price, category_id }) => {
  try {
    await pool.query(
      "UPDATE items SET name = $1, year = $2, price = $3, category_id = $4 WHERE id = $5",
      [name, year, price, category_id, id]
    );
  } catch (error) {
    throw new Error("Error updating item");
  }
};

const deleteItem = async (id) => {
  try {
    await pool.query("DELETE FROM items WHERE id = $1", [id]);
  } catch (error) {
    throw new Error("Error deleting item");
  }
};

module.exports = {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
  getItemsByCategory,
};
