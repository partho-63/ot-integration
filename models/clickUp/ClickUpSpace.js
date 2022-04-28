const mongoose = require("mongoose");

// ClickUp Space -> OneThread Project
const clickUpSpaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    spaceId: {
      type: String,
      required: true,
    },
    folders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ClickUpFolder",
      },
    ],
    workspace: {
      type: mongoose.Types.ObjectId,
      ref: "ClickUpWorkspace",
    },
  },
  {
    timestamps: true,
  }
);

const ClickUpSpace = mongoose.model("ClickUpSpace", clickUpSpaceSchema);

module.exports = ClickUpSpace;
