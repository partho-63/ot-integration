const mongoose = require("mongoose");

const trelloWorkspaceSchema = mongoose.Schema(
  {
    workspaceId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    boards: {
      type: mongoose.Types.ObjectId,
      ref: "TrelloBoard",
    },
    trello: {
      type: mongoose.Types.ObjectId,
      ref: "Trello",
    },
  },
  {
    timestamps: true,
  }
);

const TrelloWorkspace = mongoose.model(
  "TrelloWorkspace",
  trelloWorkspaceSchema
);

module.exports = TrelloWorkspace;
