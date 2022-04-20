// dependencies
const express = require("express");

const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { checkLogin } = require("../middlewares/common/checkLogin");
const { getTrelloToken } = require("../middlewares/trello/getTrelloToken");
const {
  importTrelloWorkspaces,
} = require("../middlewares/trello/importTrelloWorkspaces");
const {
  importTrelloBoards,
} = require("../middlewares/trello/importTrelloBoards");
const {
  importTrelloLists,
} = require("../middlewares/trello/importTrelloLists");
const {
  importTrelloCards,
} = require("../middlewares/trello/importTrelloCards");
const {
  renderTrelloHomePage,
  authorizeTrelloAccount,
  saveTrelloToken,
  // importFromTrello,
} = require("../controller/trelloController");

const router = express.Router();

// Trello Home page
router.get(
  "/",
  decorateHtmlResponse("Trello Home Page"),
  checkLogin,
  getTrelloToken,
  renderTrelloHomePage
);

// get authorize Trello page
router.get("/authorize", decorateHtmlResponse(""), authorizeTrelloAccount);

// authorize Trello account and save trello token
router.post(
  "/authorize",
  decorateHtmlResponse(""),
  checkLogin,
  saveTrelloToken
);

// import all from Trello
router.get(
  "/import",
  decorateHtmlResponse("Trello Home Page"),
  checkLogin,
  getTrelloToken,
  importTrelloWorkspaces,
  importTrelloBoards,
  importTrelloLists,
  importTrelloCards,
  renderTrelloHomePage
);

module.exports = router;
