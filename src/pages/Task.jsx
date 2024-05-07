import React from "react";
import TaskList from "../components/TaskList";
import Create from "../components/Task/Create";
import { Typography } from "antd";

const { Title } = Typography;

const Task = () => {
  return (
    <>
      <div className="container">
        <Create />
        <TaskList />
      </div>
    </>
  );
};

export default Task;
