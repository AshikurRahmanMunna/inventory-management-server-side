const {
  getCategories,
  createCategory,
} = require("../controllers/catgeory.controller");

const router = require("express").Router();

router.route("/").get(getCategories).post(createCategory);

module.exports = router;
