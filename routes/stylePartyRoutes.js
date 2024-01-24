const express = require('express');
const { getAllStyleParties, getStylePartyById, createStyleParty, updateStyleParty, deleteStyleParty } = require('../controllers/stylePartyController.js');

const styelPartyRouter = express.Router();

styelPartyRouter.get("/styleparty", getAllStyleParties);
styelPartyRouter.get("/styleparty/:id", getStylePartyById);
styelPartyRouter.post("/styleparty/create", createStyleParty);
styelPartyRouter.put("/styleparty/update/:id", updateStyleParty);
styelPartyRouter.delete("/styleparty/delete/:id", deleteStyleParty);

module.exports = styelPartyRouter;