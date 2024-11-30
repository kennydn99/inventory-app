const { Router } = require("express");
const router = Router();
const categoriesController = require("../controllers/categoriesController");

// CRUD routes for categories
router.get("/", categoriesController.getAllCategories);
router.post("/", categoriesController.createCategory);
router.get("/:id", categoriesController.getCategoryById);
router.put("/:id", categoriesController.updateCategory);
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
