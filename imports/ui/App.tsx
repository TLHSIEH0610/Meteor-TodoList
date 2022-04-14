import React, { Fragment, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TaskCollection } from "../api/TasksCollection";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { TaskProp } from "/imports/model/model";
import Login from "/imports/ui/Login";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);
  //not equal
  const hideCompletedFilter = { isChecked: { $ne: true } };
  //owner object
  const userFilter = { userID: user?._id };

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const pendingTaskCount = useTracker(() => {
    if (!user) {
      return 0;
    }

    return TaskCollection.find(pendingOnlyFilter).count();
  });

  const tasks = useTracker(() =>
    TaskCollection.find(hideCompleted ? pendingOnlyFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );

  const onCheckboxClick = ({ _id, isChecked }: TaskProp) => {
    TaskCollection.update(_id, {
      $set: {
        isChecked: !isChecked,
      },
    });
  };

  const onDeleteClick = ({ _id }: TaskProp) => {
    TaskCollection.remove(_id);
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

            <TaskForm user={user} />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>

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
