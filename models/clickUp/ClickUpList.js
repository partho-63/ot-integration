const mongoose = require("mongoose");

// ClickUp List -> OneThread
const clickUpListSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    orderindex: {
      type: Number,
    },
    content: {
      type: String,
    },
    listId: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ClickUpTask",
      },
    ],
    folder: {
      type: mongoose.Types.ObjectId,
      ref: "ClickUpFolder",
    },
  },
  {
    timestamps: true,
  }
);

const ClickUpList = mongoose.model("ClickUpList", clickUpListSchema);

module.exports = ClickUpList;
