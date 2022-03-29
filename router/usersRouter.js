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

const router = express.Router();

// get user list page
router.get("/", decorateHtmlResponse("Users List"), getUsers);

// get user create page
router.get("/add", decorateHtmlResponse("Add User"), addUser);

// post a user
router.post("/add", addUserValidators, addUserValidationHandler, createUser);

// delete a user
router.delete("/:id", removeUser);

module.exports = router;
