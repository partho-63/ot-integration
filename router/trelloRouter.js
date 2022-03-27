// dependencies
const express = require("express");

const { getCards } = require("../controller/trelloController");

const router = express.Router();

// card list page
router.get("/cards", getCards);

module.exports = router;
