const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/User");

// render clickUp home page
async function renderClickUpHomePage(req, res, next) {
  try {
    // check if user is logged in
    let cookies =
      Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    token = cookies[process.env.COOKIE_NAME];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    res.clientId = process.env.CLIENT_ID;
    res.clientSecret = process.env.CLIENT_SECRET;
    res.loggedInUser = decoded;

    // set locals CLIENT_ID, CLIENT_SECRET and loggend in user
    res.render("clickUp/clickUpHomePage");
  } catch (err) {
    console.log(err);
    next(err);
  }
}

// render clickUp authorize page
function authorizeClickUpAccount(req, res, next) {
  // check if user is logged in
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  try {
    token = cookies[process.env.COOKIE_NAME];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    let code = req.query.code;
    if (!code) {
      code = "";
    }
    // set locals CLIENT_ID, CLIENT_SECRET and loggend in user
    res.render("clickUp/clickUpAuthorizePage", {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      code: code,
      loggedInUser: decoded,
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  renderClickUpHomePage,
  authorizeClickUpAccount,
};
