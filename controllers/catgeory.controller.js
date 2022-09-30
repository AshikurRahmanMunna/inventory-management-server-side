const {
  getCategoryService,
  createCategoryService,
} = require("../services/category.service");

exports.getCategories = async (req, res) => {
  try {
    const categories = await getCategoryService();
    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      error: "Couldn't get categories",
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const categories = await createCategoryService();
    if (categories.insertedCount) {
      res.status(200).json({
        status: "success",
        message: "Successfully Created The Category",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: "fail",
      error: "Couldn't create the category",
    });
  }
};
