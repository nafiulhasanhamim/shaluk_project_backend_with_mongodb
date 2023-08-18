const userrouter = require("express").Router();
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { userProfile, updateUserProfile, getAllProducts, allFoodShops, allMedicineShops, individualProduct, specificShopProducts, medicineProducts, foodProducts, placeOrder, orderByAParticularCustomer } = require("../../controllers/userControllers/user.controllers");
const { isCustomer } = require("../../controllers/authControllers/auth.controllers");
  
userrouter.use(passport.initialize());

userrouter.post("/user/user-profile",userProfile);
userrouter.put("/user/update-profile",isCustomer,updateUserProfile);
userrouter.get("/product/get-all-products",getAllProducts);
userrouter.get("/shop/all-food-shops",allFoodShops);
userrouter.get("/shop/all-medicine-shops",allMedicineShops);
userrouter.post("/product/individual-product",individualProduct);
userrouter.post("/product/products-by-a-specific-shop",specificShopProducts)
userrouter.get("/product/medicine-products",medicineProducts);
userrouter.get("/product/food-products",foodProducts);
userrouter.post("/order/place-order",isCustomer,placeOrder);
userrouter.post("/order/order-by-a-particular-user",isCustomer,orderByAParticularCustomer);

module.exports = userrouter;