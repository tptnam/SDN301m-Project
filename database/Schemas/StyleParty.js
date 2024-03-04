const mongoose = require("mongoose");

const stylePartySchema = new mongoose.Schema(
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

const StylePartyModel = mongoose.model("StyleParty", stylePartySchema);

module.exports = StylePartyModel;
