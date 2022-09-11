const { getProductService, createProduct } = require("../services/product.services");

exports.getProducts = async (req, res) => {
  try {
    const products = await getProductService(
      req.query.page * req.query.resultsPerPage,
      req.query.resultsPerPage
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const result = await createProduct(req.body);
    // const product = new Product(req.body);
    // const data = await product.save();
    res
      .status(200)
      .json({ status: "success", message: "Data inserted successfully", data: result });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Something Wen't Wrong",
      error: error.message,
    });
  }
};
