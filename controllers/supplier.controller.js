const {
  createSupplierService,
  getSuppliersService,
  getSuppliersByIdService,
  updateSupplierByIdService,
} = require("../services/supplier.service");

exports.createSupplier = async (req, res) => {
  try {
    const data = await createSupplierService(req.body);
    res.status(200).json({
      status: "success",
      data
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "fail",
      data: "Couldn't create the supplier",
    });
  }
};

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await getSuppliersService(req.body);
    res.status(200).json({
      status: "success",
      data: suppliers,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "Couldn't get suppliers",
    });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await getSuppliersByIdService(id);
    if (!supplier) {
      res.status(400).json({
        status: "success",
        error: "Couldn't find the supplier with this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: supplier,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "Couldn't get the supplier",
    });
  }
};

exports.updateSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateSupplierByIdService(id, req.body);
    if (!result.nModified) {
      res.status(400).json({
        status: "success",
        error: "Couldn't update the supplier with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully Updated The Supplier",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: "Couldn't get the supplier",
    });
  }
};
