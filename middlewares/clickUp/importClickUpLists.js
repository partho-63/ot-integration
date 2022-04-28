const fetch = require("node-fetch");
const ClickUpSpace = require("../../models/clickUp/ClickUpSpace");
const ClickUpFolder = require("../../models/clickUp/ClickUpFolder");
const ClickUpList = require("../../models/clickUp/ClickUpList");

const importClickUpLists = async function (req, res, next) {
  try {
    res.locals.lists = [];

    const spaces = res.locals.spaces;
    const folders = res.locals.folders;

    if (folders.length !== 0) {
      for await (const folder of folders) {
        const accessToken = res.locals.accessToken;
        const clickUpFolderId = folder.folderId;

        // url for getting lists of folder
        const url = `https://api.clickup.com/api/v2/folder/${clickUpFolderId}/list?archived=false`;
        const response = await fetch(url, {
          headers: {
            Authorization: accessToken,
          },
        });
        const result = await response.json();

        for await (const list of result.lists) {
          // save new lists
          let newList = new ClickUpList({
            name: list.name,
            orderindex: list.orderindex,
            content: list.content,
            listId: list.id,
            folder: folder._id,
          });

          const savedList = await newList.save();

          // add list id to folder
          const folderUpdateResult = await ClickUpFolder.updateOne(
            {
              _id: folder._id,
            },
            {
              $push: {
                lists: savedList._id,
              },
            }
          );
          res.locals.lists.push(savedList);
        }
      }
    }
    if (spaces.length !== 0) {
      for await (const space of spaces) {
        const accessToken = res.locals.accessToken;
        const clickUpSpaceId = space.spaceId;

        // url for getting boards of workspace
        const url = `https://api.clickup.com/api/v2/space/${clickUpSpaceId}/list?archived=false`;
        const response = await fetch(url, {
          headers: {
            Authorization: accessToken,
          },
        });
        const result = await response.json();

        if (result.lists.length !== 0) {
          let currentTimeInMilliseconds = Date.now();

          let newFolder = new ClickUpFolder({
            name: `${space.name}_hidden_folder`,
            hidden: true,
            folderId: `${space.spaceId}_${currentTimeInMilliseconds}`,
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

          for await (const list of result.lists) {
            // save new lists
            let newList = new ClickUpList({
              name: list.name,
              orderindex: list.orderindex,
              content: list.content,
              listId: list.id,
              folder: savedFolder._id,
            });

            const savedList = await newList.save();

            // add list id to folder
            const folderUpdateResult = await ClickUpFolder.updateOne(
              {
                _id: savedFolder._id,
              },
              {
                $push: {
                  lists: savedList._id,
                },
              }
            );
            res.locals.lists.push(savedList);
          }
        }
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { importClickUpLists };
