const { Router } = require("express");
const router = Router();
const itemsController = require("../controllers/itemsController");

// CRUD routes for items
router.get("/", itemsController.getAllItems);
// router.post('/', itemsController.createItem);
// router.get('/:id', itemsController.getItemById);
// router.put('/:id', itemsController.updateItem);
// router.delete('/:id', itemsController.deleteItem);

module.exports = router;
