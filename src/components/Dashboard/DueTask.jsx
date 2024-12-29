import React, { useState, useEffect } from "react";
import { Card, Table, Tag, Typography, Skeleton } from "antd";
import axios from "axios";

const { Title } = Typography;

const columns = [
  {
    title: "Nama Tugas",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tanggal Pembuatan",
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try{
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/get`)
        setTasks(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, []); 

  const [tasks, setTasks] = useState([]);

  const test = () => {
    console.log(joinedArrayOrder);
  };

  const taskNotDoneArray = [];
  const taskDue = [];
  const taskWorker = [];
  const taskDone = tasks.reduce((total, item) => {
    item.tasks.forEach((task) => {
      if (task.status == "pending") {
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
          Tugas terlama
        </Title>
        {loading ? (
          <Skeleton active title={false} paragraph={{rows: 3}}/>
        ) : (

        <Table
          columns={columns}
          dataSource={joinedArrayOrder.slice(0, 3)}
          pagination={{ position: [] }}
        />
        )}
      </Card>
      {/* <button onClick={test}>T</button> */}
    </div>
  );
};

export default DueTask;
