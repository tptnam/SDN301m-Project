const MenuSchemaModel = require("../database/Schemas/Menu.js");
const { refreshToken } = require("../utils/JWT-helpers");

const CatchAsyncErrors = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// const getAllMenu = CatchAsyncErrors(async (req, res, next) => {
//   try {
//     const Menu = await MenuSchemaModel.find({});
//     if (!Menu) {
//       return res.status(404).json({
//         success: false,
//         message: "Menu not found",
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       Menu,
//       message: "Succesfully!",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

const getAllMenu = async (req, res) => {
  if (req.cookies.accessToken && req.cookies.refreshToken) {
    const accessToken = await refreshToken(
      req.cookies.accessToken,
      req.cookies.refreshToken
    );
    if (accessToken) {
      const Menu = await MenuSchemaModel.find({});
      if (Menu)
        res.render("admin/menuDashboard", {
          path: "/admin/menuDashboard",
          pageTitle: "Menu dashboard",
          menu: Menu,
        });
      // res.status(200).json({
      //   success: true,
      //   Menu: Menu,
      //   message: "Succesfully!",
      // });
    } else res.render("404", { pageTitle: "Not found", path: "/404" });
  } else
    res.render("401", {
      pageTitle: "Unauthorized",
      path: "/401",
      error: "Unauthorized",
    });
};

const getMenuById = CatchAsyncErrors(async (req, res, next) => {
  try {
    const MenuID = req.params.id;

    const Menu = await MenuSchemaModel.findById(MenuID);
    if (!Menu) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    return res.status(200).json({
      success: true,
      Menu,
      message: "Get by ID successfully",
    });
  } catch (error) {
    next(error);
  }
});

const createMenu = CatchAsyncErrors(async (req, res, next) => {
  try {
    const Menu = await MenuSchemaModel.create({
      name: req.body.name,
      description: req.body.description,
      status: "active",
    });
    if (!Menu) {
      return res.status(404).json({
        success: false,
        message: "Unsuccessfully!",
      });
    }
    // return res.status(200).json({
    //   success: true,
    //   Menu,
    //   message: "Create successfully!",
    // });
    return res.redirect("/admin/menuDashboard");
  } catch (error) {
    next(error);
  }
});

const updateMenu = CatchAsyncErrors(async (req, res, next) => {
  try {
    const MenuID = req.params.id;
    const { name, description, status } = req.body;
    const Menu = await MenuSchemaModel.findByIdAndUpdate(MenuID, req.body);
    const updatedMenu = await MenuSchemaModel.findById(MenuID);
    return res.status(200).json({
      success: true,
      updatedMenu,
      message: "Update successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const deleteMenu = CatchAsyncErrors(async (req, res, next) => {
  try {
    const MenuID = String(req.params.id);
    const Menu = await MenuSchemaModel.findByIdAndDelete(MenuID);
    return res.status(200).json({
      success: true,
      Menu,
      message: "Delete successfully!",
    });
  } catch (error) {
    next(error);
  }
});

const deleteStyleParty = CatchAsyncErrors(async (req, res, next) => {
  try {
    const stylePartyId = req.params.id;
    const styleParty = await stylePartyModel.findByIdAndDelete(stylePartyId);
    return res.status(200).json({
      success: true,
      styleParty,
      message: "Delete successfully!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getAllMenu,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
};
