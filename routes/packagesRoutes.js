const express = require('express');
const { getAllPackages } = require('../controllers/packagesController.js');

const packageRouter = express.Router();

packageRouter.get("/", getAllPackages);

module.exports = packageRouter;
