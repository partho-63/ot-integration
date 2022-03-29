// dependencies
const express = require("express");

const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidatorHandler,
} = require("../middlewares/login/loginValidators");
const { getLogin, login, logout } = require("../controller/loginController");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");

const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Login"), getLogin);
// router.get("/", decorateHtmlResponse("Login"), redirectLoggedIn, getLogin);

// login
router.post(
  "/",
  decorateHtmlResponse("Login"),
  doLoginValidators,
  doLoginValidatorHandler,
  login
);

// logout
router.delete("/", logout);

module.exports = router;
