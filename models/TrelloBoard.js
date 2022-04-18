const mongoose = require("mongoose");

const trelloBoardSchema = mongoose.Schema(
  {
    boardId: {
      type: String,
      required: true,
    },
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
