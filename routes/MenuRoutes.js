const express = require("express");
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
menuRouter.post("/menu/create", createMenu);
menuRouter.put("/menu/update/:id", updateMenu);
menuRouter.delete("/menu/delete/:id", deleteMenu);

module.exports = menuRouter;
