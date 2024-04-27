import React from "react";
import TaskList from "../components/TaskList";
import Create from "../components/Task/Create";
import { Typography } from "antd";
import DateComponent from "../components/Misc/DateComponent";

const { Title } = Typography;

const Task = () => {
  return (
    <>
      {/* <div className="title">
        <Title
          level={2}
          style={{
            textAlign: "Left",
            paddingTop: "0px",
            marginTop: "0px",
            marginBottom: "24px",
          }}
        >
          Daftar Tugas
        </Title>
        <DateComponent />
      </div> */}
      <div className="container">
        <Create />
        <TaskList />
      </div>
    </>
  );
};

export default Task;
