const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true],
    },
    description: {
      type: String,
      required: [true],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const ServiceSchemaModel = mongoose.model("Service", ServiceSchema);

module.exports = ServiceSchemaModel;
