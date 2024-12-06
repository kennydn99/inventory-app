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

// Route to render the edit form for an item
router.get("/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await itemsController.getItemById(id);
    const categories = await categoriesController.getAllCategories();
    res.render("items/update", { item, categories });
  } catch (error) {
    res.status(500).send("Error loading item for updating");
  }
});

//Handle udpating item
router.post("/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year, price, category_id } = req.body;

    await itemsController.updateItem(id, { name, year, price, category_id });
    res.redirect(`/items/${id}`);
  } catch (error) {
    res.status(500).send("Error updating item");
  }
});

router.post("/:id/delete", async (req, res) => {
  const { id } = req.params;

  try {
    await itemsController.deleteItem(id);
    res.redirect("/categories");
  } catch (error) {
    res.status(500).send("Error deleting item");
  }
});

module.exports = router;
