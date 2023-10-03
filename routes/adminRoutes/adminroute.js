const adminrouter = require("express").Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const {
  isAdmin,
} = require("../../controllers/authControllers/auth.controllers");
const {
  addProduct,
  addShop,
  allShops,
  getAllOrders,
  changeOrderStatus,
} = require("../../controllers/adminControllers/admin.controllers");

adminrouter.use(passport.initialize());
// get all orders
adminrouter.get("/order/get-all-orders", isAdmin, getAllOrders);
adminrouter.post("/product/add-product", isAdmin, addProduct);
adminrouter.get("/shop/get-all-shops", allShops);
adminrouter.post("/shop/add-shop", isAdmin, addShop);
// adminrouter.get("/shop/delete-shops",deletetShops);
// adminrouter.get("/product/delete-products",deletetProducts);
//place order
adminrouter.put("/order/change-order-status", isAdmin, changeOrderStatus);

module.exports = adminrouter;
