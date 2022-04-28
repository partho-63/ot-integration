const mongoose = require("mongoose");

// ClickUp Member -> OneThread Member
const clickUpMemberSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    memberId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ClickUpMember = mongoose.model("ClickUpMember", clickUpMemberSchema);

module.exports = ClickUpMember;
