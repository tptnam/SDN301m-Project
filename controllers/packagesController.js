const packageModel = require("../database/Schemas/Packages.js");
const { refreshToken } = require('../utils/JWT-helpers');
const CatchAsyncErrors = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};


const getAllPackages = async (req, res) => {
  if (req.cookies.accessToken && req.cookies.refreshToken) {
    const accessToken = await refreshToken(
      req.cookies.accessToken,
      req.cookies.refreshToken,
    );
    if (accessToken) {
      const packages = await packageModel.find(
        { role: { $ne: 'admin' } },
        {
          _id: 1,
          name: 1,
          type: 1,
          description: 1,
          price: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      );
      if (packages)
        res.render('admin/packagesDashboard', {
          path: '/admin/packages-dashboard',
          pageTitle: 'Packages dashboard',
          packages: packages,
        });
    } else res.render('404', { pageTitle: 'Not found', path: '/404' });
  } else
    res.render('401', {
      pageTitle: 'Unauthorized',
      path: '/401',
      error: 'Unauthorized',
    });
};

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
    // return res.status(200).json({
    //   success: true,
    //   packages,
    //   message: "Create a new package successfully!",
    // });

    res.redirect('/admin/packages-dashboard');
  } catch (error) {
    next(error);
  }
});

const updatePackage = CatchAsyncErrors(async (req, res, next) => {
  try {
    const packageID = req.params.id;
    const { name, type, description, price, status } = req.body;
    const packages = await packageModel.findByIdAndUpdate(packageID, req.body);
    const updatedPackage = await packageModel.findById(packageID);
    // return res.status(200).json({
    //   success: true,
    //   updatedPackage,
    //   message: "Update a package successfully!",
    // });
    send.redirect('/admin/packages-dashboard');

  } catch (error) {
    next(error);
  }
});

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
