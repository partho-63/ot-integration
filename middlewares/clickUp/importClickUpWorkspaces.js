const fetch = require("node-fetch");
const User = require("../../models/User");
const ClickUp = require("../../models/clickUp/ClickUp");
const ClickUpWorkspace = require("../../models/clickUp/ClickUpWorkspace");

const importClickUpWorkspaces = async function (req, res, next) {
  try {
    res.locals.workspaces = [];

    const accessToken = res.locals.accessToken;

    // url for getting workspaces (teams)
    const url = `https://api.clickup.com/api/v2/team`;

    const response = await fetch(url, {
      headers: {
        Authorization: accessToken,
      },
    });
    const result = await response.json();

    const user = await User.findOne({
      email: res.locals.loggedInUser.email,
    });

    const existingClickUp = await ClickUp.findOne({
      user: user._id,
    });

    for await (const workspace of result.teams) {
      // save new workspaces
      let newWorkspace = new ClickUpWorkspace({
        name: workspace.name,
        color: workspace.color,
        avatar: workspace.avatar,
        workspaceId: workspace.id,
        clickUp: existingClickUp._id,
      });

      const savedWorkspace = await newWorkspace.save();

      // add workspace id to clickUp
      const clickUpUpdateResult = await ClickUp.updateOne(
        {
          _id: existingClickUp._id,
        },
        {
          $push: {
            workspaces: savedWorkspace._id,
          },
        }
      );

      res.locals.workspaces.push(savedWorkspace);
    }

    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { importClickUpWorkspaces };
