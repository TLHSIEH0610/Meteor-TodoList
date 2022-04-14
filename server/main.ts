import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TaskCollection } from "/imports/api/TasksCollection";

const USERNAME = "back2dev";
const PASSWORD = "back2dev";

Meteor.startup(() => {
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
      TaskCollection.insert({ text: taskText, isChecked: false })
    );
  }

  if (!Accounts.findUserByUsername(USERNAME)) {
    Accounts.createUser({
      username: USERNAME,
      password: PASSWORD,
    });
  }
});
