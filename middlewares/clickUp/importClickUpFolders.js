const fetch = require("node-fetch");
const ClickUpSpace = require("../../models/clickUp/ClickUpSpace");
const ClickUpFolder = require("../../models/clickUp/ClickUpFolder");

const importClickUpFolders = async function (req, res, next) {
  try {
    res.locals.folders = [];

    const spaces = res.locals.spaces;

    if (spaces.length !== 0) {
      for await (const space of spaces) {
        const accessToken = res.locals.accessToken;
        const clickUpSpaceId = space.spaceId;

        // url for getting boards of workspace
        const url = `https://api.clickup.com/api/v2/space/${clickUpSpaceId}/folder?archived=false`;
        const response = await fetch(url, {
          headers: {
            Authorization: accessToken,
          },
        });
        const result = await response.json();

        for await (const folder of result.folders) {
          // save new folders
          let newFolder = new ClickUpFolder({
            name: folder.name,
            orderIndex: folder.orderIndex,
            overrideStatuses: folder.overrideStatuses,
            hidden: folder.hidden,
            taskCount: folder.taskCount,
            folderId: folder.id,
            space: space._id,
          });

          const savedFolder = await newFolder.save();

          // add folder id to space
          const spaceUpdateResult = await ClickUpSpace.updateOne(
            {
              _id: space._id,
            },
            {
              $push: {
                folders: savedFolder._id,
              },
            }
          );
          res.locals.folders.push(savedFolder);
        }
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { importClickUpFolders };
