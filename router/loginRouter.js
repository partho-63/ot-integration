// dependencies
const express = require("express");

const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const { getLogin } = require("../controller/loginController");

const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Login"), getLogin);

module.exports = router;
