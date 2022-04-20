const User = require("../../models/User");
const Trello = require("../../models/Trello");
const TrelloWorkspace = require("../../models/TrelloWorkspace");
const TrelloBoard = require("../../models/TrelloBoard");
const TrelloList = require("../../models/TrelloList");
const TrelloCard = require("../../models/TrelloCard");

// get trello token of logged in user
const getTrelloToken = async function (req, res, next) {
  try {
    // get user
    const user = await User.findOne({
      email: res.locals.loggedInUser.email,
    });

    // get trello of user
    const trello = await Trello.findOne({
      user: user._id,
    });

    // if trello exists get workspaces, boards, lists, cards of user
    if (trello) {
      if (res.locals.html) {
        let workspaces = [];
        let boards = [];
        let lists = [];
        let cards = [];

        // find workspaces of user
        workspaces = await TrelloWorkspace.find({
          trello: trello._id,
        });

        // if workspace exists get boards
        if (workspaces.length !== 0) {
          for await (const workspace of workspaces) {
            const workspaceBoards = await TrelloBoard.find({
              workspace: workspace._id,
            });
            boards.push(workspaceBoards);

            // if board exists get lists
            if (workspaceBoards.length !== 0) {
              for await (const board of workspaceBoards) {
                const boardLists = await TrelloList.find({
                  board: board._id,
                });
                lists.push(boardLists);

                // if list exists get cards
                if (boardLists.length !== 0) {
                  for await (const list of boardLists) {
                    const listCards = await TrelloCard.find({
                      list: list._id,
                    });
                    cards.push(listCards);
                  }
                }
              }
            }
          }
        }

        // set html locals
        res.locals.trelloId = trello._id;
        res.locals.trelloToken = trello.token;
        res.locals.trelloMemberId = trello.memberId;
        res.locals.trelloApiKey = process.env.TRELLO_API_KEY;
        res.locals.workspaces = workspaces;
        res.locals.boards = boards;
        res.locals.lists = lists;
        res.locals.cards = cards;
      }
    } else {
      if (res.locals.html) {
        res.locals.trelloId = "";
        res.locals.trelloToken = "";
        res.locals.trelloMemberId = "";
        res.locals.trelloApiKey = "";
        res.locals.workspaces = [];
        res.locals.boards = [];
        res.locals.lists = [];
        res.locals.cards = [];
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { getTrelloToken };
