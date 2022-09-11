const Product = require("../models/Product");

exports.getProductService = async (skip, limit) => {
  const products = await Product.find({}).skip(skip).limit(limit);
  return products;
};

exports.createProduct = async(data) => {
    const product = await Product.create(data);
    return product;
}
