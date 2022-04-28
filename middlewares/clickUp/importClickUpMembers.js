const fetch = require("node-fetch");
const ClickUpTask = require("../../models/clickUp/ClickUpTask");
const ClickUpSubTask = require("../../models/clickUp/ClickUpSubTask");
const ClickUpMember = require("../../models/clickUp/ClickUpMember");

const importClickUpMembers = async function (req, res, next) {
  try {
    res.locals.members = [];

    const tasks = res.locals.tasks;
    const subTasks = res.locals.subTasks;

    if (tasks.length !== 0) {
      for await (const task of tasks) {
        const accessToken = res.locals.accessToken;
        const clickUpTaskId = task.taskId;

        // url for getting members of task
        const url = `https://api.clickup.com/api/v2/task/${clickUpTaskId}/member`;
        const response = await fetch(url, {
          headers: {
            Authorization: accessToken,
          },
        });
        const result = await response.json();

        for await (const member of result.members) {
          // check if Member already exists
          let savedMember = await ClickUpMember.findOne({
            email: member.email,
          });

          if (!savedMember) {
            // save new members
            let newMember = new ClickUpMember({
              username: member.username,
              email: member.email,
              memberId: member.id,
            });

            savedMember = await newMember.save();
          }

          // add member id to task
          const taskUpdateResult = await ClickUpTask.updateOne(
            {
              _id: task._id,
            },
            {
              $push: {
                members: savedMember._id,
              },
            }
          );
          res.locals.members.push(savedMember);
        }
      }
    }

    if (subTasks.length !== 0) {
      for await (const subTask of subTasks) {
        const accessToken = res.locals.accessToken;
        const clickUpSubTaskId = subTask.subTaskId;

        // url for getting members of subTask
        const url = `https://api.clickup.com/api/v2/task/${clickUpSubTaskId}/member`;
        const response = await fetch(url, {
          headers: {
            Authorization: accessToken,
          },
        });
        const result = await response.json();

        for await (const member of result.members) {
          // check if Member already exists
          let savedMember = await ClickUpMember.findOne({
            email: member.email,
          });

          if (!savedMember) {
            // save new members
            let newMember = new ClickUpMember({
              username: member.username,
              email: member.email,
              memberId: member.id,
            });

            savedMember = await newMember.save();
          }

          // add member id to subTask
          const subTaskUpdateResult = await ClickUpSubTask.updateOne(
            {
              _id: subTask._id,
            },
            {
              $push: {
                members: savedMember._id,
              },
            }
          );
          res.locals.members.push(savedMember);
        }
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

module.exports = { importClickUpMembers };
