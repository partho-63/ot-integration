const mongoose = require("mongoose");

// ClickUp SubTask -> OneThread SubTask
const clickUpSubTaskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    textContent: {
      type: String,
    },
    description: {
      type: String,
    },
    orderindex: {
      type: Number,
    },
    subTaskId: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ClickUpMember",
      },
    ],
    task: {
      type: mongoose.Types.ObjectId,
      ref: "ClickUpTask",
    },
  },
  {
    timestamps: true,
  }
);

const ClickUpSubTask = mongoose.model("ClickUpSubTask", clickUpSubTaskSchema);

module.exports = ClickUpSubTask;
