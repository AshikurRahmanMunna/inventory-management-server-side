const Product = require("../models/Product");
const {
  getStockService,
  createStockService,
  updateProductByIdService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
  getStockByIdService,
} = require("../services/stock.service");

exports.getStocks = async (req, res) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);

    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }
    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = limit;
    }
    const stocks = await getStockService(filters, queries);
    res.status(200).json(stocks);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't Get Products",
      error: error.message,
    });
  }
};

exports.createStock = async (req, res) => {
  try {
    const stock = await createStockService(req.body);
    // const product = new Product(req.body);
    // const data = await product.save();
    res.status(200).json({
      status: "success",
      message: "Stock created successfully",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Something Wen't Wrong",
      error: error.message,
    });
  }
};

exports.getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await getStockByIdService(id);
    if (!stock) {
      return res.status(400).json({
        status: "fail",
        error: "Can't get the stock with this id",
      });
    }
    res.status(200).json({ status: "success", data: stock });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the stock",
      error: error.message,
    });
  }
};

// exports.updateProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await updateProductByIdService(id, req.body);
//     res.status(200).json({
//       status: "success",
//       message: "Successfully updated the product",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Couldn't Update the product",
//       error: error.message,
//     });
//   }
// };

// exports.bulkUpdateProduct = async (req, res) => {
//   try {
//     const result = await bulkUpdateProductService(req.body);
//     res.status(200).json({
//       status: "success",
//       message: "Successfully updated the product",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Couldn't Update the product",
//       error: error.message,
//     });
//   }
// };

// exports.deleteProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await deleteProductByIdService(id);
//     res.status(200).json({
//       status: "success",
//       message: "Successfully deleted the product",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Couldn't delete the product",
//       error: error.message,
//     });
//   }
// };

// exports.bulkDeleteProduct = async (req, res) => {
//   try {
//     const result = await bulkDeleteProductService(req.body);
//     if (!result.deletedCount) {
//       return res.status(200).json({
//         status: "failed",
//         error: "Couldn't delete the product",
//       });
//     }
//     res.status(200).json({
//       status: "success",
//       message: "Successfully deleted the given products",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Couldn't delete the given products",
//       error: error.message,
//     });
//   }
// };
