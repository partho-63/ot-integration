const mongoose = require("mongoose");

// Trello Workspace -> OneThread Company
const trelloWorkspaceSchema = mongoose.Schema(
  {
    createdBy: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    uniqueName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    type: {
      type: String,
    },
    optionalRole: {
      type: String,
    },
    about: {
      type: String,
    },
    email: {
      type: String,
    },
    legalOwnerName: {
      type: String,
    },
    legalOwnerEmail: {
      type: String,
    },
    location: {
      type: String,
    },
    websites: {
      type: String,
    },
    // departments: {
    //   type: Departments
    // },
    registrationYear: {
      type: String,
    },
    totalEmployees: {
      type: String,
    },
    officeSize: {
      type: String,
    },
    parentCompanies: {
      type: String,
    },
    isRemoved: {
      type: Boolean,
    },
    workspaceId: {
      type: String,
      required: true,
    },
    boards: {
      type: mongoose.Types.ObjectId,
      ref: "TrelloBoard",
    },
    trello: {
      type: mongoose.Types.ObjectId,
      ref: "Trello",
    },
  },
  {
    timestamps: true,
  }
);

const TrelloWorkspace = mongoose.model(
  "TrelloWorkspace",
  trelloWorkspaceSchema
);

module.exports = TrelloWorkspace;
