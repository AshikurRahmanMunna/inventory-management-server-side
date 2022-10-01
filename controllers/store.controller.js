const {
  getStoreByIdService,
  createStoreService,
  getStoresService,
} = require("../services/store.service");

exports.getStores = async (req, res) => {
  try {
    const stores = await getStoresService();
    res.status(200).json({ status: "success", data: stores });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      error: "Couldn't get stores",
    });
  }
};
exports.createStore = async (req, res) => {
  try {
    const result = await createStoreService(req.body);
    res.status(200).json({
      status: "success",
      message: "store created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Couldn't get the store",
      error: error.message,
    });
  }
};
exports.getStoreById = async (req, res) => {
  try {
    const {id} = req.params;
    const store = await getStoreByIdService(id);
    res.status(200).json({ status: "success", data: store });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      error: "Couldn't get store",
    });
  }
};
