const {
  createBrandService,
  getBrandsService,
  getBrandByIdService,
  updateBrandByIdService,
} = require("../services/brand.service");

exports.createBrand = async (req, res) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the brand",
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      error: "Couldn't create the brand",
    });
  }
};

exports.getBrands = async (req, res) => {
  try {
    const brands = await getBrandsService(req.body);
    res.status(200).json({
      status: "success",
      data: brands,
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      error: "Couldn't get brands",
    });
  }
};

exports.getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await getBrandByIdService(id);
    if (!brand) {
      res.status(400).json({
        status: "success",
        error: "Couldn't find the brand with this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      error: "Couldn't get the brand",
    });
  }
};

exports.updateBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateBrandByIdService(id, req.body);
    if (!result.nModified) {
      res.status(400).json({
        status: "success",
        error: "Couldn't update the brand with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully Updated The Brand",
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      error: "Couldn't get the brand",
    });
  }
};
