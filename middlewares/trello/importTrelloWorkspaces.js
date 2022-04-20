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

    // url for getting workspaces of member
    const url = `https://api.trello.com/1/members/${trelloMemberId}/organizations?key=${trelloApiKey}&token=${trelloToken}`;

    const response = await fetch(url);
    const result = await response.json();

    const user = await User.findOne({
      email: res.locals.loggedInUser.email,
    });

    const existingTrello = await Trello.findOne({
      user: user._id,
    });

    const currentDate = new Date();

    for await (const workspace of result) {
      // save new workspaces
      let newWorkspace = new TrelloWorkspace({
        createdBy: workspace.idMemberCreator,
        name: workspace.displayName,
        uniqueName: workspace.name,
        logo: workspace.logoUrl,
        type: workspace.teamType,
        about: workspace.desc,
        websites: workspace.website,
        registrationYear: currentDate.getFullYear(),
        totalEmployees: workspace.memberships.length,
        workspaceId: workspace.id,
        trello: existingTrello._id,
        // coverImage,
        // optionalRole,
        // email,
        // location,
        // officeSize,
        // parentCompanies,
        // isRemoved,
        // legalOwnerName,
        // legalOwnerEmail,
        // departments,
      });

      const savedWorkspace = await newWorkspace.save();

      // add workspace id to trello
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
