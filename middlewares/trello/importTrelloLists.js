const fetch = require("node-fetch");
const TrelloBoard = require("../../models/TrelloBoard");
const TrelloList = require("../../models/TrelloList");

const importTrelloLists = async function (req, res, next) {
  try {
    res.locals.lists = [];

    const boards = res.locals.boards;

    if (boards.length !== 0) {
      for await (const board of boards) {
        const trelloApiKey = res.locals.trelloApiKey;
        const trelloToken = res.locals.trelloToken;
        const trelloBoardId = board.boardId;

        const url = `https://api.trello.com/1/boards/${trelloBoardId}/lists?key=${trelloApiKey}&token=${trelloToken}`;
        const response = await fetch(url);
        const result = await response.json();

        for await (const list of result) {
          let newList = new TrelloList({
            listId: list.id,
            name: list.name,
            board: board._id,
          });

          const savedList = await newList.save();

          const boardUpdateResult = await TrelloBoard.updateOne(
            {
              _id: board._id,
            },
            {
              $push: {
                lists: savedList._id,
              },
            }
          );
          res.locals.lists.push(savedList);
        }
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { importTrelloLists };
