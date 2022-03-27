// dependencies
const express = require("express");

const { getUsers } = require("../controller/userController");

const router = express.Router();

//  page
router.get("/", getUsers);

module.exports = router;
