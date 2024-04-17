import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import "../style/Dashboard.css";
import List from "../components/Dashboard/List";
import Detail from "../components/Dashboard/Detail";

const { Title } = Typography;

const Dashboard = () => {
  // Tanggal
  const d = new Date();
  const day = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "December",
  ];
  const date = `${day[d.getDay()]}, ${d.getDate()} ${
    month[d.getMonth()]
  } ${d.getFullYear()}`;

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
        <Title
          level={5}
          style={{ 
            marginTop: "0px", 
            paddingBottom: "0px", 
            opacity: "50%" }}
        >
          {date}
        </Title>
      </div>
      <div className="wrapper">
        <Detail />
        <List />
      </div>
    </div>
  );
};

export default Dashboard;
