import React from "react";
import Task from "./Task";

export default function TaskProgress({ tasks, title }) {
  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <h3 className="taskProgressHeader">{title}</h3>
      {tasks?.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
}
