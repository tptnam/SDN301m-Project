const express = require("express");
const {
  getAllStyleParties,
  getStylePartyById,
  createStyleParty,
  updateStyleParty,
  deleteStyleParty,
} = require("../controllers/stylePartyController.js");

const styelPartyRouter = express.Router();

styelPartyRouter.get("/styleparty", getAllStyleParties);
styelPartyRouter.get("/styleparty/:id", getStylePartyById);
styelPartyRouter.post("/styleparty", createStyleParty);
styelPartyRouter.put("/styleparty/:id", updateStyleParty);
styelPartyRouter.delete("/styleparty/:id", deleteStyleParty);

module.exports = styelPartyRouter;
