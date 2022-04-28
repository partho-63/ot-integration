const fetch = require("node-fetch");
const ClickUpWorkspace = require("../../models/clickUp/ClickUpWorkspace");
const ClickUpSpace = require("../../models/clickUp/ClickUpSpace");

const importClickUpSpaces = async function (req, res, next) {
  try {
    res.locals.spaces = [];

    const workspaces = res.locals.workspaces;

    if (workspaces.length !== 0) {
      for await (const workspace of workspaces) {
        const accessToken = res.locals.accessToken;
        const clickUpWorkspaceId = workspace.workspaceId;

        // url for getting boards of workspace
        const url = `https://api.clickup.com/api/v2/team/${clickUpWorkspaceId}/space?archived=false`;
        const response = await fetch(url, {
          headers: {
            Authorization: accessToken,
          },
        });
        const result = await response.json();

        for await (const space of result.spaces) {
          // save new spaces
          let newSpace = new ClickUpSpace({
            name: space.name,
            spaceId: space.id,
            workspace: workspace._id,
          });

          const savedSpace = await newSpace.save();

          // add space id to workspace
          const workspaceUpdateResult = await ClickUpWorkspace.updateOne(
            {
              _id: workspace._id,
            },
            {
              $push: {
                spaces: savedSpace._id,
              },
            }
          );
          res.locals.spaces.push(savedSpace);
        }
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { importClickUpSpaces };
