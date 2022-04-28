const fetch = require("node-fetch");
const User = require("../../models/User");
const ClickUp = require("../../models/clickUp/ClickUp");

// save clickUp token for logged in user
const saveClickUpToken = async function (req, res, next) {
  try {
    const clientId = req.body.clientId;
    const clientSecret = req.body.clientSecret;
    const code = req.body.code;
    const url = `https://api.clickup.com/api/v2/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

    const response = await fetch(url, { method: "POST" });
    const result = await response.json();

    // get user
    const user = await User.findOne({
      email: res.locals.loggedInUser.email,
    });

    // check if ClickUp already exists
    const existingClickUp = await ClickUp.findOne({
      user: user._id,
    });

    // if no ClickUp exists against user, save new ClickUp
    if (!existingClickUp) {
      let accessToken = result.access_token;
      let newClickUp = new ClickUp({
        access_token: accessToken,
        user: user._id,
      });

      const savedClickUp = await newClickUp.save();
      res.locals.accessToken = savedClickUp.access_token;
    } else {
      res.locals.accessToken = existingClickUp.access_token;
    }

    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { saveClickUpToken };
