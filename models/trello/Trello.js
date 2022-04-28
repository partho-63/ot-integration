const mongoose = require("mongoose");

// model for saving Trello Token and ID for a member
const trelloSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    memberId: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    workspaces: [
      {
        type: mongoose.Types.ObjectId,
        ref: "TrelloWorkspace",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Trello = mongoose.model("Trello", trelloSchema);

module.exports = Trello;
