import React, { useState, useEffect } from "react";
import { Card, Table, Tag, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;

const columns = [
  {
    title: "Nama Tugas",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tenggat Waktu",
    dataIndex: "date",
    key: "date",
    render: (text) => <Tag color="red">{text}</Tag>,

  },
  {
    title: "Nama Penerima",
    dataIndex: "worker",
    key: "worker",
  },
];

const DueTask = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => setTasks(result.data));
  });

  const [tasks, setTasks] = useState([]);

  const test = () => {
    console.log(joinedArrayOrder);
  };

  const taskNotDoneArray = [];
  const taskDue = [];
  const taskWorker = [];
  const taskDone = tasks.reduce((total, item) => {
    item.tasks.forEach((task) => {
      if (!task.isDone) {
        taskNotDoneArray.push(task.description);
        taskDue.push(task.dueTo);
        taskWorker.push(item.name);
      }
    });
    return total;
  }, 0);

  const joinedArray = taskNotDoneArray.map((taskName, index) => ({
    name: taskName,
    date: taskDue[index],
    worker: taskWorker[index],
  }));

  const joinedArrayOrder = joinedArray.sort((a, b) => {
    const dateA = new Date(a.date.split("-").reverse().join("-")); // Convert date strings to Date objects
    const dateB = new Date(b.date.split("-").reverse().join("-"));
    return dateA - dateB;
  });

  return (
    <div className="due">
      <Card
        style={{
          width: "100%",
          height: "22em",
          overflow: "auto",
        }}
      >
        <Title level={4} style={{ marginTop: "0px", fontWeight: "bold" }} onClick={test}>
          Tugas mendatang
        </Title>
        <Table
          columns={columns}
          dataSource={joinedArrayOrder.slice(0, 3)}
          pagination={{ position: [] }}
        />
      </Card>
      {/* <button onClick={test}>T</button> */}
    </div>
  );
};

export default DueTask;
