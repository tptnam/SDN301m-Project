const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema(
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

const MenuSchemaModel = mongoose.model("Menu", MenuSchema);

module.exports = MenuSchemaModel;
