import React, { useState } from "react";
// import { TaskCollection } from "../api/TasksCollection";
import { Meteor } from "meteor/meteor";

const TaskForm = () => {
  const [text, setText] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Meteor.call("tasks.insert", text);
    // TaskCollection.insert({
    //   text: text,
    //   createdAt: new Date(),
    //   isChecked: false,
    //   userID: user._id,
    // });
    setText("");
  };
  return (
    <form className="taskForm" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Add New Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
