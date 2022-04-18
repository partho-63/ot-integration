const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/User");
const Trello = require("../models/Trello");

async function renderTrelloHomePage(req, res, next) {
  try {
    res.render("trello/trelloHomePage");
  } catch (err) {
    console.log(err);
    next(err);
  }
}

function authorizeTrelloAccount(req, res, next) {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  try {
    token = cookies[process.env.COOKIE_NAME];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.render("trello/trelloAuthorizePage", {
      trelloApiKey: process.env.TRELLO_API_KEY,
      loggedInUser: decoded,
    });
  } catch (err) {
    console.log(err);
  }
}

async function saveTrelloToken(req, res, next) {
  if (req.body.error === true) {
    throw createError("Trello integration failed!");
  } else {
    try {
      const trelloToken = req.body.trelloToken;
      const memberId = req.body.memberId;
      const user = await User.findOne({
        email: req.body.userEmail,
      });

      const existingTrello = await Trello.findOne({
        user: user._id,
      });

      if (!existingTrello) {
        let newTrello = new Trello({
          token: trelloToken,
          memberId: memberId,
          user: user._id,
        });

        const result = await newTrello.save();
      }
      res.redirect("/trello");
    } catch (err) {
      throw createError(err);
    }
  }
}

// import all from Trello
async function importFromTrello(req, res, next) {
  res.redirect("/trello");
}

module.exports = {
  renderTrelloHomePage,
  authorizeTrelloAccount,
  saveTrelloToken,
  importFromTrello,
};
