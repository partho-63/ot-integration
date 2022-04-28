const mongoose = require("mongoose");

// Trello Board -> OneThread Project
const trelloBoardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    lists: [
      {
        type: mongoose.Types.ObjectId,
        ref: "TrelloList",
      },
    ],
    boardId: {
      type: String,
      required: true,
    },
    workspace: {
      type: mongoose.Types.ObjectId,
      ref: "TrelloWorkspace",
    },
  },
  {
    timestamps: true,
  }
);

const TrelloBoard = mongoose.model("TrelloBoard", trelloBoardSchema);

module.exports = TrelloBoard;
