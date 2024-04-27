import React from "react";
import { Typography } from "antd";
import AddWorker from "../components/Task/AddWorker";
import WorkerList from "../components/Worker/WorkerList";
import "../style/Worker.css";
import DateComponent from "../components/Misc/DateComponent";

const { Title } = Typography;

const Worker = () => {
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
          Daftar Karyawan
        </Title>
        <DateComponent />
      </div> */}
      <div className="container">
        <div className="kiri">
          <AddWorker />
        </div>
        <WorkerList />
      </div>
    </>
  );
};

export default Worker;
