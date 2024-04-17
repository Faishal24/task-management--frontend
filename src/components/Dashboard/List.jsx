import React, { useState, useEffect } from "react";
import { Card } from "antd";
import axios from "axios";

const tabListNoTitle = [
  {
    key: "total",
    label: "Total",
  },
  {
    key: "tersedia",
    label: "Tersedia",
  },
  {
    key: "terselesaikan",
    label: "Terselesaikan",
  },
];

const List = () => {
  const [activeTabKey, setActiveTabKey] = useState("total");

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  // Ringkasan
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => setTasks(result.data))
      .catch((err) => console.log(err));
  }, []);

  // rincian tugas
  const totalTasksArray = [];
  const totalTasks = tasks.reduce((total, item) => {
    item.tasks.forEach((task) => {
      totalTasksArray.push(task.description);
    });
    return total;
  }, 0);

  const taskDoneArray = [];
  const taskNotDoneArray = [];
  const taskDone = tasks.reduce((total, item) => {
    item.tasks.forEach((task) => {
      if (task.isDone) {
        taskDoneArray.push(task.description);
      } else {
        taskNotDoneArray.push(task.description);
      }
    });
    return total;
  }, 0);

  const contentListNoTitle = {
    total: totalTasksArray.map((desc, index) => (
      <tr className="tabelKanan">
        <td>{index + 1}.</td>
        <td>{desc}</td>
      </tr>
    )),
    tersedia: taskNotDoneArray.map((desc, index) => (
      <tr className="tabelKanan">
        <td>{index + 1}.</td>
        <td>{desc}</td>
      </tr>
    )),
    terselesaikan: taskDoneArray.map((desc, index) => (
      <tr className="tabelKanan">
        <td className="td2">{index + 1}.</td>
        <td className="td2">{desc}</td>
      </tr>
    )),
  };

  return (
    <div className="tugasKanan">
      <Card
        className="cardTugasKanan"
        style={{
          width: "21em",
          minHeight: "500px",
          maxHeight: "500px",
          overflow: "auto",
        }}
        defaultActiveTabKey="total"
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
        tabProps={{
          size: "middle",
        }}
      >
        {contentListNoTitle[activeTabKey]}
      </Card>
    </div>
  );
};

export default List;
