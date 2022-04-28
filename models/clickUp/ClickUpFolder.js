const mongoose = require("mongoose");

// ClickUp Folder -> OneThread
const clickUpFolderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    orderIndex: {
      type: Number,
    },
    overrideStatuses: {
      type: Boolean,
    },
    hidden: {
      type: Boolean,
    },
    taskCount: {
      type: Number,
    },
    folderId: {
      type: String,
      required: true,
    },
    lists: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ClickUpList",
      },
    ],
    space: {
      type: mongoose.Types.ObjectId,
      ref: "ClickUpSpace",
    },
  },
  {
    timestamps: true,
  }
);

const ClickUpFolder = mongoose.model("ClickUpFolder", clickUpFolderSchema);

module.exports = ClickUpFolder;
