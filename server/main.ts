import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TaskCollection } from "../imports/db/TasksCollection";
import "/imports/api/tasksMethods";
import "/imports/api/tasksPublications";

const USERNAME = "back2dev";
const PASSWORD = "back2dev";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(USERNAME)) {
    Accounts.createUser({
      username: USERNAME,
      password: PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(USERNAME) as Meteor.User;

  if (TaskCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) =>
      TaskCollection.insert({
        text: taskText,
        isChecked: false,
        userId: user._id,
        createdAt: new Date(),
      })
    );
  }
});
