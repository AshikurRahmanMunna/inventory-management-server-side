const Category = require("../models/Category");

exports.getCategoryService = async () => {
  const results = await Category.find({});
  return results;
};
exports.createCategoryService = async (data) => {
  const result = await Category.create(data);
  return result;
};
