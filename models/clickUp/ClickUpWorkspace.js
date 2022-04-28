const mongoose = require("mongoose");

// ClickUp Workspace -> OneThread Company
const clickUpWorkspaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    avatar: {
      type: String,
    },
    workspaceId: {
      type: String,
      required: true,
    },
    spaces: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ClickUpSpace",
      },
    ],
    clickUp: {
      type: mongoose.Types.ObjectId,
      ref: "ClickUp",
    },
  },
  {
    timestamps: true,
  }
);

const ClickUpWorkspace = mongoose.model(
  "ClickUpWorkspace",
  clickUpWorkspaceSchema
);

module.exports = ClickUpWorkspace;
