const { Router } = require("express");
const router = Router();
const itemsController = require("../controllers/itemsController");
const categoriesController = require("../controllers/categoriesController");

// CRUD routes for items
router.get("/", itemsController.getAllItems);

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

// Route to display a single item's details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the item details using the controller
    const item = await itemsController.getItemById(id);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    // Render the 'items/show' view with the fetched data
    res.render("items/show", { item });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", itemsController.createItem);
router.put("/:id", itemsController.updateItem);
router.delete("/:id", itemsController.deleteItem);

module.exports = router;
