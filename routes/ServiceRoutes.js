const express = require("express");
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
ServiceRouter.post("/service/create", createService);
ServiceRouter.put("/service/update/:id", updateService);
ServiceRouter.delete("/service/delete/:id", deleteService);

module.exports = ServiceRouter;
