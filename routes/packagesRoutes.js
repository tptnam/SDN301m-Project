const express = require('express');
const { getAllPackages, getPackageById, createPackage, updatePackage, deletePackage } = require('../controllers/packagesController.js');

const packageRouter = express.Router();

packageRouter.get("/package", getAllPackages);
packageRouter.get("/package/:id", getPackageById);
packageRouter.post("/package/create", createPackage);
packageRouter.put("/package/update/:id", updatePackage);
packageRouter.delete("/package/delete/:id", deletePackage);

module.exports = packageRouter;
