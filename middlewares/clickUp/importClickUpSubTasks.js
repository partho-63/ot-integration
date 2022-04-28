const fetch = require("node-fetch");
const ClickUpTask = require("../../models/clickUp/ClickUpTask");
const ClickUpSubTask = require("../../models/clickUp/ClickUpSubTask");

const importClickUpSubTasks = async function (req, res, next) {
  try {
    res.locals.subTasks = [];

    const tasks = res.locals.tasks;

    if (tasks.length !== 0) {
      for await (const task of tasks) {
        const accessToken = res.locals.accessToken;
        const clickUpTaskId = task.taskId;

        // url for getting subTasks of task
        const url = `https://api.clickup.com/api/v2/task/${clickUpTaskId}/?include_subtasks=true`;
        const response = await fetch(url, {
          headers: {
            Authorization: accessToken,
          },
        });
        const result = await response.json();
        if (result.subtasks) {
          for await (const subTask of result.subtasks) {
            // save new subTasks
            let newSubTask = new ClickUpSubTask({
              name: subTask.name,
              textContent: subTask.textContent,
              description: subTask.description,
              orderindex: subTask.orderindex,
              subTaskId: subTask.id,
              task: task._id,
            });

            const savedSubTask = await newSubTask.save();

            // add task id to list
            const taskUpdateResult = await ClickUpTask.updateOne(
              {
                _id: task._id,
              },
              {
                $push: {
                  subTasks: savedSubTask._id,
                },
              }
            );
            res.locals.subTasks.push(savedSubTask);
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

module.exports = { importClickUpSubTasks };
