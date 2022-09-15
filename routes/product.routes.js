const {
  createProduct,
  getProducts,
  updateProductById,
  bulkUpdateProduct,
  deleteProductById,
  bulkDeleteProduct,
} = require("../controllers/product.controller");

const router = require("express").Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/bulk-update").patch(bulkUpdateProduct);
router.route("/bulk-delete").delete(bulkDeleteProduct);
router.route("/:id").patch(updateProductById).delete(deleteProductById);

module.exports = router;
