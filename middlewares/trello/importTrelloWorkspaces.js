const fetch = require("node-fetch");
const User = require("../../models/User");
const Trello = require("../../models/Trello");
const TrelloWorkspace = require("../../models/TrelloWorkspace");

const importTrelloWorkspaces = async function (req, res, next) {
  try {
    res.locals.workspaces = [];

    const trelloApiKey = res.locals.trelloApiKey;
    const trelloToken = res.locals.trelloToken;
    const trelloMemberId = res.locals.trelloMemberId;

    const url = `https://api.trello.com/1/members/${trelloMemberId}/organizations?key=${trelloApiKey}&token=${trelloToken}`;

    const response = await fetch(url);
    const result = await response.json();

    const user = await User.findOne({
      email: res.locals.loggedInUser.email,
    });

    const existingTrello = await Trello.findOne({
      user: user._id,
    });

    for await (const workspace of result) {
      let newWorkspace = new TrelloWorkspace({
        workspaceId: workspace.id,
        name: workspace.displayName,
        trello: existingTrello._id,
      });

      const savedWorkspace = await newWorkspace.save();

      const trelloUpdateResult = await Trello.updateOne(
        {
          _id: existingTrello._id,
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

module.exports = { importTrelloWorkspaces };
