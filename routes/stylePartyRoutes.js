const express = require("express");
const verifyToken = require('../middleware/verify.js');
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
styelPartyRouter.post("/styleparty", verifyToken, createStyleParty);
styelPartyRouter.put("/styleparty/:id", verifyToken, updateStyleParty);
styelPartyRouter.delete("/styleparty/:id", verifyToken, deleteStyleParty);

module.exports = styelPartyRouter;
