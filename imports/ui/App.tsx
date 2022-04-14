import React, { Fragment, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "../db/TasksCollection";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { TaskProp } from "/imports/model/model";
import Login from "/imports/ui/Login";

interface TrackerProps {
  tasks: TaskProp[];
  pendingTaskCount: number;
  isLoading?: boolean;
}

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [hideCompleted, setHideCompleted] = useState(false);
  //not equal
  const hideCompletedFilter = { isChecked: { $ne: true } };
  //owner object
  const userFilter = { userId: user?._id };

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTaskCount, isLoading }: TrackerProps = useTracker(
    () => {
      const noDataAvailable = {
        tasks: [],
        pendingTaskCount: 0,
        isLoading: false,
      };
      if (!Meteor.user()) {
        return noDataAvailable;
      }

      const handler = Meteor.subscribe("tasks");

      if (!handler.ready()) {
        return { ...noDataAvailable, isLoading: true };
      }

      const tasks = TaskCollection.find(
        hideCompleted ? pendingOnlyFilter : {},
        {
          sort: { createdAt: -1 },
        }
      ).fetch();

      const pendingTaskCount = TaskCollection.find(pendingOnlyFilter).count();

      return { tasks, pendingTaskCount, isLoading: false };
    }
  );

  // const pendingTaskCount = useTracker(() => {
  //   if (!user) {
  //     return 0;
  //   }

  //   return TaskCollection.find(pendingOnlyFilter).count();
  // });

  // const tasks = useTracker(() =>
  //   TaskCollection.find(hideCompleted ? pendingOnlyFilter : {}, {
  //     sort: { createdAt: -1 },
  //   }).fetch()
  // );

  const onCheckboxClick = ({ _id, isChecked }: TaskProp) => {
    Meteor.call("tasks.setIsChecked", _id, !isChecked);
    // TaskCollection.update(_id, {
    //   $set: {
    //     isChecked: !isChecked,
    //   },
    // });
  };

  const onDeleteClick = ({ _id }: TaskProp) => {
    // TaskCollection.remove(_id);
    Meteor.call("tasks.remove", _id);
  };

  const logout = () => Meteor.logout();

  return (
    <div className="app">
      {user ? (
        <Fragment>
          <header>
            <div className="app-bar">
              <div className="app-header">
                <h1>ToDo List {user && `(${pendingTaskCount})`}</h1>
              </div>
            </div>
          </header>

          <div className="main">
            <div className="user" onClick={logout}>
              {user.username} 🚪
            </div>

            <TaskForm />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>

            {isLoading && <div className="loading">loading...</div>}

            <ul className="tasks">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={onCheckboxClick}
                  onDeleteClick={onDeleteClick}
                />
              ))}
            </ul>
          </div>
        </Fragment>
      ) : (
        <Login />
      )}
    </div>
  );
};
