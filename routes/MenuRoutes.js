const express = require("express");
const verifyToken = require("../middleware/verify.js");

const {
  getAllMenu,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/MenuController.js");

const menuRouter = express.Router();

menuRouter.get("/menu", getAllMenu);
menuRouter.get("/menu/:id", getMenuById);
menuRouter.post("/menu/", createMenu);

menuRouter.put("/menu/:id", updateMenu);
menuRouter.delete("/menu/:id", deleteMenu);


module.exports = menuRouter;
