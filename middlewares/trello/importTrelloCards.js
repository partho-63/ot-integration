const fetch = require("node-fetch");
const TrelloCard = require("../../models/trello/TrelloCard");
const TrelloList = require("../../models/trello/TrelloList");

const importTrelloCards = async function (req, res, next) {
  try {
    res.locals.cards = [];

    const lists = res.locals.lists;

    if (lists.length !== 0) {
      for await (const list of lists) {
        const trelloApiKey = res.locals.trelloApiKey;
        const trelloToken = res.locals.trelloToken;
        const trelloListId = list.listId;

        // url for getting cards of list
        const url = `https://api.trello.com/1/lists/${trelloListId}/cards?key=${trelloApiKey}&token=${trelloToken}`;
        const response = await fetch(url);
        const result = await response.json();

        for await (const card of result) {
          // save new cards
          let newCard = new TrelloCard({
            cardId: card.id,
            name: card.name,
            list: list._id,
          });

          const savedCard = await newCard.save();

          // add card id to list
          const listUpdateResult = await TrelloList.updateOne(
            {
              _id: list._id,
            },
            {
              $push: {
                cards: savedCard._id,
              },
            }
          );
          res.locals.cards.push(savedCard);
        }
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { importTrelloCards };
