const router = require("express").Router();
const stockController = require("../controllers/stock.controller");
const uploader = require("../middleware/uploader");

// router.route("/bulk-update").patch(stockController.bulkUpdateStock);
// router.route("/bulk-delete").delete(stockController.bulkDeletePStock);
router.route("/").get(stockController.getStocks).post(stockController.createStock);
router
  .route("/:id")
  .get(stockController.getStockById)
//   .patch(stockController.updateStockById)
//   .delete(stockController.deleteStockById);

module.exports = router;
