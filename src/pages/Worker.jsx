import React, {useState, useEffect} from "react";
import { Typography } from "antd";
import AddWorker from "../components/Task/AddWorker";
import WorkerList from "../components/Worker/WorkerList";
import "../style/Worker.css";

const { Title } = Typography;

const Worker = () => {
  return (
    <>
      <div className="container">
        <div className="kiri">
          <AddWorker />
        </div>
        <WorkerList/>
      </div>
    </>
  );
};

export default Worker;
