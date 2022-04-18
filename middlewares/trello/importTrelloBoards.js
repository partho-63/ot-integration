const fetch = require("node-fetch");
const TrelloWorkspace = require("../../models/TrelloWorkspace");
const TrelloBoard = require("../../models/TrelloBoard");

const importTrelloBoards = async function (req, res, next) {
  try {
    res.locals.boards = [];

    const workspaces = res.locals.workspaces;

    if (workspaces.length !== 0) {
      for await (const workspace of workspaces) {
        const trelloApiKey = res.locals.trelloApiKey;
        const trelloToken = res.locals.trelloToken;
        const trelloWorkspaceId = workspace.workspaceId;

        const url = `https://api.trello.com/1/organizations/${trelloWorkspaceId}/boards?key=${trelloApiKey}&token=${trelloToken}`;
        const response = await fetch(url);
        const result = await response.json();

        for await (const board of result) {
          let newBoard = new TrelloBoard({
            boardId: board.id,
            name: board.name,
            description: board.desc,
            workspace: workspace._id,
          });

          const savedBoard = await newBoard.save();

          const workspaceUpdateResult = await TrelloWorkspace.updateOne(
            {
              _id: workspace._id,
            },
            {
              $push: {
                boards: savedBoard._id,
              },
            }
          );
          res.locals.boards.push(savedBoard);
        }
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { importTrelloBoards };
