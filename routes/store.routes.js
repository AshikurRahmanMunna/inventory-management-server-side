const { getStores, createStore, getStoreById } = require("../controllers/store.controller");

const router = require("express").Router();

router.route("/").get(getStores).post(createStore);

router.route("/:id").get(getStoreById);

module.exports = router;
