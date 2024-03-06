const packageModel = require("../database/Schemas/Packages.js");

const CatchAsyncErrors = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// const getAllPackages = CatchAsyncErrors(async (req, res, next) => {
//   try {
//     const packages = await packageModel.find({});
//     if (!packages) {
//       return res.status(404).json({
//         success: false,
//         message: "Package not found",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       packages,
//       message: "Get all packages successfully!",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

const getAllPackages = CatchAsyncErrors(async (req, res, next) => {
  try {
    const packages = await packageModel.find({});
    console.log("Packages:", packages);

    if (!Array.isArray(packages)) {
      throw new Error('packages data is not an array');
    }

    res.render('package', { packages: packages });
    // if (!packages) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Package not found",
    //   });
    // }
    // return res.status(200).json({
    //   success: true,
    //   packages,
    //   message: "Get all packages successfully!",
    // });

   
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// const getAllPackages = CatchAsyncErrors(async (req, res, next) => {
//   try {
//     const packages = await packageModel.find({});
//     console.log("Packages:", packages);

//     if (!packages || packages.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Package not found",
//       });
//     }

//     // Return the packages directly
//     return packages;
//   } catch (error) {
//     console.error("Error fetching classes:", error);
//     // Throw the error to be caught by the route handler
//     throw new Error('Internal Server Error');
//   }
// });


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
    const { name, type, image, description, price, status } = req.body;
    const packages = await packageModel.create({
      name,
      type,
      image,
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




const updatePackage = CatchAsyncErrors(async (req, res, next) => {
  try {
    const packageID = req.params.id;
    const { name, type, image, description, price, status } = req.body;
    const package = await packageModel.findByIdAndUpdate(
      packageID,
      req.body
    );
    const updatedPackage = await packageModel.findById(packageID);
    return res.status(200).json({
      success: true,
      updatedPackage,
      message: "Update a package successfully!",
    });
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
