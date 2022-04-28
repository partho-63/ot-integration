const mongoose = require("mongoose");

// Trello Card -> OneThread Task
const trelloCardSchema = mongoose.Schema(
  {
    cardId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    closed: {
      type: String,
      enum: ["true", "false"],
    },
    idMembers: [
      {
        type: String,
      },
    ],
    list: {
      type: mongoose.Types.ObjectId,
      ref: "TrelloList",
    },
  },
  {
    timestamps: true,
  }
);

const TrelloCard = mongoose.model("TrelloCard", trelloCardSchema);

module.exports = TrelloCard;
