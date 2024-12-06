const pool = require("../db/pool");

const getAllCategories = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createCategory = async ({ name }) => {
  try {
    await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);
  } catch (err) {
    console.error("Error in createCategory:", err);
    throw new Error("Error creating category");
  }
};

const getCategoryById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return null; // Return null if category not found
    }
    return result.rows[0]; // Return the category data
  } catch (err) {
    console.error("Error in getCategoryById:", err);
    throw new Error("Error retrieving category");
  }
};

const updateCategory = async (id, name) => {
  try {
    await pool.query("UPDATE categories SET name = $1 WHERE id = $2", [
      name,
      id,
    ]);
  } catch (error) {
    throw new Error("Error updating category");
  }
};

const deleteCategory = async (id) => {
  try {
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
  } catch (error) {
    throw new Error("Error deleting category");
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
