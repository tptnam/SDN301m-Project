const express = require('express');
const { getAllPackages, getPackageById, createPackage, updatePackage, deletePackage } = require('../controllers/packagesController.js');

const packageRouter = express.Router();

packageRouter.get("/package", getAllPackages);
packageRouter.get("/package/:id", getPackageById);
packageRouter.post("/package", createPackage);
packageRouter.put("/package/:id", updatePackage);
packageRouter.delete("/package/:id", deletePackage);

module.exports = packageRouter;