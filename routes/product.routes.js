const router = require("express").Router();
const {
  createProduct,
  getProducts,
  updateProductById,
  bulkUpdateProduct,
  deleteProductById,
  bulkDeleteProduct,
  fileUpload,
} = require("../controllers/product.controller");
const uploader = require("../middleware/uploader");





router.post('/file-upload', uploader.array("image"), fileUpload);
router.route("/").get(getProducts).post(createProduct);
router.route("/bulk-update").patch(bulkUpdateProduct);
router.route("/bulk-delete").delete(bulkDeleteProduct);
router.route("/:id").patch(updateProductById).delete(deleteProductById);

module.exports = router;
