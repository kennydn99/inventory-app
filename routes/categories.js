const { Router } = require("express");
const router = Router();
const categoriesController = require("../controllers/categoriesController");
const itemsController = require("../controllers/itemsController");

// CRUD routes for categories
router.get("/", async (req, res) => {
  try {
    const categories = await categoriesController.getAllCategories();
    res.render("categories/index", { categories });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to display all items in a category
router.get("/:categoryId/items", async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Fetch category and its items
    const category = await categoriesController.getCategoryById(categoryId);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    const items = await itemsController.getItemsByCategory(categoryId);

    // Render the 'items/index' view with the fetched data
    res.render("items/index", { category, items });
  } catch (error) {
    console.error("Error fetching category or items:", error);
    res.status(500).send("Error fetching category or items");
  }
});

// Serve new category form
router.get("/new", (req, res) => {
  res.render("categories/new");
});

// Create category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    await categoriesController.createCategory({ name });
    res.redirect("/categories");
  } catch (err) {
    res.status(500).send("Error creating category");
  }
});

// render update form
router.get("/:id/update", async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoriesController.getCategoryById(id);
    res.render("categories/update", { category });
  } catch (error) {
    res.status(500).send("Error loading category for updating");
  }
});

// handle updating category
router.post("/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await categoriesController.updateCategory(id, name);
    res.redirect(`/categories`);
  } catch (error) {
    res.status(500).send("Error updating category");
  }
});

router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
