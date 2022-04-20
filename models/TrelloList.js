const mongoose = require("mongoose");

// Trello List -> OneThread Status
const trelloListSchema = mongoose.Schema(
  {
    listId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cards: [
      {
        type: mongoose.Types.ObjectId,
        ref: "TrelloCard",
      },
    ],
    board: {
      type: mongoose.Types.ObjectId,
      ref: "TrelloBoard",
    },
  },
  {
    timestamps: true,
  }
);

const TrelloList = mongoose.model("TrelloList", trelloListSchema);

module.exports = TrelloList;
