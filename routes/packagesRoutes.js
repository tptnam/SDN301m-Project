const express = require("express");
const verifyToken = require('../middleware/verify.js');
const packageControllers = require("../controllers/packagesController.js");

const packageRouter = express.Router();

packageRouter.get("/package", packageControllers.getAllPackages);
packageRouter.get("/package/:id", packageControllers.getPackageById);
// packageRouter.post("/package", verifyToken, packageControllers.createPackage);
packageRouter.post("/package", packageControllers.createPackage);
packageRouter.put("/package/:id", packageControllers.updatePackage);
packageRouter.delete("/package/:id", verifyToken, packageControllers.deletePackage);

module.exports = packageRouter;
