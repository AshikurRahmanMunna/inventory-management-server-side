const { createProduct, getProducts } = require("../controllers/product.controller");

const router = require("express").Router();

router.route("/").get(getProducts).post(createProduct);

module.exports = router;