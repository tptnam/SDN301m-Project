const ServiceSchema = require("../database/Schemas/Service.js");

const CatchAsyncErrors = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const getAllService = CatchAsyncErrors(async (req, res, next) => {
  try {
    const Service = await ServiceSchema.find({});
    if (!Service) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    return res.status(200).json({
      success: true,
      Service,
      message: "Succesfully!",
    });
  } catch (error) {
    next(error);
  }
});

const getServiceById = CatchAsyncErrors(async (req, res, next) => {
  try {
    const ServiceID = req.params.id;

    const Service = await ServiceSchema.findById(ServiceID);
    if (!Service) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    return res.status(200).json({
      success: true,
      Service,
      message: "Get by ID successfully",
    });
  } catch (error) {
    next(error);
  }
});

const createService = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { name, description, status } = req.body;
    const Service = await ServiceSchema.create({
      name,
      description,
      status,
    });
    if (!Service) {
      return res.status(404).json({
        success: false,
        message: "Unsuccessfully!",
      });
    }
    return res.status(200).json({
      success: true,
      Service,
      message: "Create a new style party successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const updateService = CatchAsyncErrors(async (req, res, next) => {
  try {
    const ServiceID = req.params.id;
    const { name, description, status } = req.body;
    const Service = await ServiceSchema.findByIdAndUpdate(ServiceID, req.body);
    const updatedService = await ServiceSchema.findById(ServiceID);
    return res.status(200).json({
      success: true,
      updatedService,
      message: "Update successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const deleteService = CatchAsyncErrors(async (req, res, next) => {
  try {
    const ServiceID = req.params.id;
    const Service = await ServiceSchema.findByIdAndDelete(ServiceID);
    return res.status(200).json({
      success: true,
      Service,
      message: "Delete successfully!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getAllService,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
