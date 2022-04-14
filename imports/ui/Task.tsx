import React from "react";
import { TaskProp } from "/imports/model/model";

interface Task {
  task: TaskProp;
  onCheckboxClick: ({ _id, isChecked }: TaskProp) => void;
  onDeleteClick: ({ _id }: TaskProp) => void;
}

const Task = ({ task, onCheckboxClick, onDeleteClick }: Task) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
      <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
};

export default Task;
