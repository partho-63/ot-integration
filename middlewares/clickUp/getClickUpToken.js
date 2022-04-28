const User = require("../../models/User");
const ClickUp = require("../../models/clickUp/ClickUp");

// get clickUp token of logged in user
const getClickUpToken = async function (req, res, next) {
  try {
    // get user
    const user = await User.findOne({
      email: res.locals.loggedInUser.email,
    });

    // find existing ClickUp against User
    const existingClickUp = await ClickUp.findOne({
      user: user._id,
    });

    // if ClickUp exists against user set accessToken
    if (existingClickUp) {
      res.locals.accessToken = existingClickUp.access_token;
    } else {
      res.locals.accessToken = "";
    }

    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { getClickUpToken };
