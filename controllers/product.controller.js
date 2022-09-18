const Product = require("../models/Product");
const {
  getProductService,
  createProductService,
  updateProductByIdService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res) => {
    const filters = {...req.query};
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if(req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }
    const products = await getProductService(filters, queries);
    res.status(200).json(products);
};

exports.createProduct = async (req, res) => {
  try {
    const result = await createProductService(req.body);
    // const product = new Product(req.body);
    // const data = await product.save();
    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Something Wen't Wrong",
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully updated the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't Update the product",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully updated the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't Update the product",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);
    res.status(200).json({
      status: "success",
      message: "Successfully deleted the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res) => {
  try {
    const result = await bulkDeleteProductService(req.body);
    if (!result.deletedCount) {
      return res.status(200).json({
        status: "failed",
        error: "Couldn't delete the product",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully deleted the given products",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the given products",
      error: error.message,
    });
  }
};
