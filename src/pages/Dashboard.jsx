import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import "../style/Dashboard.css";
import List from "../components/Dashboard/List";
import Detail from "../components/Dashboard/Detail";
import DateComponent from "../components/Misc/DateComponent";

const { Title } = Typography;

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="title">
        <Title
          level={2}
          style={{
            textAlign: "Left",
            paddingTop: "0px",
            marginTop: "0px",
            marginBottom: "24px",
          }}
        >
          Ringkasan
        </Title>
        <DateComponent/>
      </div>
      <div className="wrapper">
        <Detail />
        <List />
      </div>
    </div>
  );
};

export default Dashboard;
