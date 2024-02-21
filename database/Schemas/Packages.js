const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the package name"],
    },
    type: {
      type: String,
      required: [true, "Please enter the package type"],
    },
    description: {
      type: String,
      required: [true, "Please enter the package description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter the package price"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const PackageModel = mongoose.model("Package", packageSchema);

module.exports = PackageModel;
