const express = require("express");
const verifyToken = require('../middleware/verify.js');
const {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} = require("../controllers/packagesController.js");

const packageRouter = express.Router();

packageRouter.get("/package", getAllPackages);
packageRouter.get("/package/:id", getPackageById);
packageRouter.post("/package", verifyToken,  createPackage);
packageRouter.put("/package/:id", verifyToken, updatePackage);
packageRouter.delete("/package/:id", verifyToken, deletePackage);

module.exports = packageRouter;
