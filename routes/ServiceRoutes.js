const express = require("express");
const verifyToken = require("../middleware/verify.js");

const {
  getAllService,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/ServiceController.js");

const ServiceRouter = express.Router();

ServiceRouter.get("/service", getAllService);
ServiceRouter.get("/service/:id", getServiceById);
ServiceRouter.post("/service/", verifyToken, createService);
ServiceRouter.put("/service/:id", verifyToken, updateService);
ServiceRouter.delete("/service/:id", verifyToken, deleteService);

module.exports = ServiceRouter;
