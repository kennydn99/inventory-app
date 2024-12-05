const { Router } = require("express");
const router = Router();
const itemsController = require("../controllers/itemsController");
const categoriesController = require("../controllers/categoriesController");

// CRUD routes for items
router.get("/", itemsController.getAllItems);

// Serve new item form
router.get("/new", async (req, res) => {
  try {
    const categories = await categoriesController.getAllCategories();
    res.render("items/new", { categories });
  } catch (err) {
    res.status(500).send("Error loading form");
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

// Create items
router.post("/", async (req, res) => {
  try {
    const { name, year, price, category_id } = req.body;
    await itemsController.createItem({ name, year, price, category_id });
    res.redirect("/categories");
  } catch (err) {
    res.status(500).send("Error creating item");
  }
});

router.put("/:id", itemsController.updateItem);
router.delete("/:id", itemsController.deleteItem);

module.exports = router;
