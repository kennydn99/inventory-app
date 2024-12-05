const pool = require("../db/pool");

const getAllItems = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM items");
    res.json(rows);
  } catch (err) {
    throw new Error(err.message);
  }
};

const createItem = async (req, res) => {
  const { name, category_id } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO items (name, category_id) VALUES ($1, $2) RETURNING *",
      [name, category_id]
    );
    res.status(201).json(result.rows[0]); // Respond with the created item.
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Error creating item" });
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

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, category_id } = req.body;

  try {
    const result = await pool.query(
      "UPDATE items SET name = $1, category_id = $2 WHERE id = $3 RETURNING *",
      [name, category_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(result.rows[0]); // Respond with the updated item.
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Error updating item" });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM items WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({
      message: "Item deleted successfully",
      deletedItem: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Error deleting item" });
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
