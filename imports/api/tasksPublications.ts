import { Meteor } from "meteor/meteor";
import { TaskCollection } from "/imports/db/TasksCollection";

Meteor.publish("tasks", function publishTasks() {
  if (!this.userId) {
    throw new Meteor.Error("Not authorized.");
  }
  return TaskCollection.find({ userId: this.userId });
});
