const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const PackageModel = mongoose.model("Package", packageSchema);

module.exports = PackageModel;
