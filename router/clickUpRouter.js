// dependencies
const express = require("express");

const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { checkLogin } = require("../middlewares/common/checkLogin");
const { getClickUpToken } = require("../middlewares/clickUp/getClickUpToken");
const { saveClickUpToken } = require("../middlewares/clickUp/saveClickUpToken");
const {
  importClickUpWorkspaces,
} = require("../middlewares/clickUp/importClickUpWorkspaces");
const {
  importClickUpSpaces,
} = require("../middlewares/clickUp/importClickUpSpaces");
const {
  importClickUpFolders,
} = require("../middlewares/clickUp/importClickUpFolders");
const {
  importClickUpLists,
} = require("../middlewares/clickUp/importClickUpLists");
const {
  importClickUpTasks,
} = require("../middlewares/clickUp/importClickUpTasks");
const {
  importClickUpSubTasks,
} = require("../middlewares/clickUp/importClickUpSubTasks");
const {
  importClickUpMembers,
} = require("../middlewares/clickUp/importClickUpMembers");
const {
  renderClickUpHomePage,
  authorizeClickUpAccount,
} = require("../controller/clickUpController");

const router = express.Router();

// ClickUp Home page
router.get(
  "/",
  decorateHtmlResponse("ClickUp Home Page"),
  checkLogin,
  getClickUpToken,
  renderClickUpHomePage
);

// save ClickUp accessToken
router.post(
  "/accessToken",
  decorateHtmlResponse("ClickUp Home Page"),
  checkLogin,
  saveClickUpToken,
  renderClickUpHomePage
);

// get authorize ClickUp page
router.get("/authorize", decorateHtmlResponse(""), authorizeClickUpAccount);

// import all from ClickUp
router.get(
  "/import",
  decorateHtmlResponse("ClickUp Home Page"),
  checkLogin,
  getClickUpToken,
  importClickUpWorkspaces,
  importClickUpSpaces,
  importClickUpFolders,
  importClickUpLists,
  importClickUpTasks,
  importClickUpSubTasks,
  importClickUpMembers,
  renderClickUpHomePage
);

module.exports = router;
