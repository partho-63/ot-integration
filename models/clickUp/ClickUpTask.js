const mongoose = require("mongoose");

// ClickUp Task -> OneThread Task
const clickUpTaskSchema = mongoose.Schema(
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
    taskId: {
      type: String,
      required: true,
    },
    subTasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ClickUpSubTask",
      },
    ],
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ClickUpMember",
      },
    ],
    list: {
      type: mongoose.Types.ObjectId,
      ref: "ClickUpList",
    },
  },
  {
    timestamps: true,
  }
);

const ClickUpTask = mongoose.model("ClickUpTask", clickUpTaskSchema);

module.exports = ClickUpTask;
