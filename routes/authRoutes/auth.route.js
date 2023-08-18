const { getAllUser, getSingleUser, deleteUser, updateUser, registrationUser, loginUser, isCustomer } = require("../../controllers/authControllers/auth.controllers");

const authrouter = require("express").Router();
authrouter.get("/get-all-users",getAllUser);
authrouter.get("/:id",getSingleUser);
authrouter.post("/registration",registrationUser);
authrouter.post("/login",loginUser);
authrouter.delete("/:id",deleteUser);
authrouter.patch("/:id",updateUser);

module.exports = authrouter;