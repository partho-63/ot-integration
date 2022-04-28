const fetch = require("node-fetch");
const ClickUpList = require("../../models/clickUp/ClickUpList");
const ClickUpTask = require("../../models/clickUp/ClickUpTask");

const importClickUpTasks = async function (req, res, next) {
  try {
    res.locals.tasks = [];

    const lists = res.locals.lists;

    if (lists.length !== 0) {
      for await (const list of lists) {
        const accessToken = res.locals.accessToken;
        const clickUpListId = list.listId;

        // url for getting tasks of list
        const url = `https://api.clickup.com/api/v2/list/${clickUpListId}/task?archived=false&include_closed=true`;
        const response = await fetch(url, {
          headers: {
            Authorization: accessToken,
          },
        });
        const result = await response.json();

        for await (const task of result.tasks) {
          // save new tasks
          let newTask = new ClickUpTask({
            name: task.name,
            textContent: task.textContent,
            description: task.description,
            orderindex: task.orderindex,
            taskId: task.id,
            list: list._id,
          });

          const savedTask = await newTask.save();

          // add task id to list
          const listUpdateResult = await ClickUpList.updateOne(
            {
              _id: list._id,
            },
            {
              $push: {
                tasks: savedTask._id,
              },
            }
          );
          res.locals.tasks.push(savedTask);
        }
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { importClickUpTasks };
