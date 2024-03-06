const packageModel = require("../database/Schemas/Packages.js");

const CatchAsyncErrors = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const getAllPackages = CatchAsyncErrors(async (req, res, next) => {
  try {
    const packages = await packageModel.find({});
    if (!packages) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }
    return res.status(200).json({
      success: true,
      packages,
      message: "Get all packages successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const getPackageById = CatchAsyncErrors(async (req, res, next) => {
  try {
    const packageID = req.params.id;
    console.log("id", packageID);
    const package = await packageModel.findById(packageID);
    if (!package) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }
    return res.status(200).json({
      success: true,
      package,
      message: "Get package by ID successfully",
    });
  } catch (error) {
    next(error);
  }
});

const createPackage = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { name, type, description, price, status } = req.body;
    const packages = await packageModel.create({
      name,
      type,
      description,
      price,
      status,
    });
    if (!packages) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }
    return res.status(200).json({
      success: true,
      packages,
      message: "Create a new package successfully!",
    });
  } catch (error) {
    next(error);
  }
});

// classController.js
const updateClass = CatchAsyncErrors(async (req, res, next) => {
  try {
      const classID = req.params.id;
      const { name, numberStudent } = req.body;
      const updatedClass = await classModel.findByIdAndUpdate(classID, req.body, { new: true });
      res.redirect('/classes/');
  } catch (error) {
      next(error);
  }
});

module.exports = { updateClass };


const deletePackage = CatchAsyncErrors(async (req, res, next) => {
  try {
    const packageID = req.params.id;

    const packages = await packageModel.findByIdAndDelete(packageID);
    return res.status(200).json({
      success: true,
      packages,
      message: "Delete a package successfully!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};
