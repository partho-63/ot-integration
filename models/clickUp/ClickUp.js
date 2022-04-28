const mongoose = require("mongoose");

// model for saving ClickUp Token and ID for a member
const clickUpSchema = mongoose.Schema(
  {
    access_token: {
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
        ref: "ClickUpWorkspace",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ClickUp = mongoose.model("ClickUp", clickUpSchema);

module.exports = ClickUp;
