// dependencies
const express = require("express");

const {
  getUsers,
  addUser,
  createUser,
  removeUser,
} = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");
const { checkLogin } = require("../middlewares/common/checkLogin");

const router = express.Router();

// get user list page
router.get("/", decorateHtmlResponse("Users List"), checkLogin, getUsers);

// get user create page
router.get("/add", decorateHtmlResponse("Add User"), checkLogin, addUser);

// post a user
router.post(
  "/add",
  checkLogin,
  addUserValidators,
  addUserValidationHandler,
  createUser
);

// delete a user
router.delete("/:id", checkLogin, removeUser);

module.exports = router;
