const { Router } = require("express");
const router = Router();
const categoriesController = require("../controllers/categoriesController");

// CRUD routes for categories
router.get("/", async (req, res) => {
  try {
    const categories = await categoriesController.getAllCategories();
    res.render("categories/index", { categories });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", categoriesController.createCategory);
router.get("/:id", categoriesController.getCategoryById);
router.put("/:id", categoriesController.updateCategory);
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
