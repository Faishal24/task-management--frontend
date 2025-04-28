import { useState, useEffect } from "react";
import { Typography, Card, Statistic } from "antd";
import {
  ClockCircleOutlined,
  CheckOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import axios from "axios";
import CountUp from "react-countup";
import DueTask from "./DueTask";

const { Title } = Typography;

const Detail = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/get`)
      .then((result) => setTasks(result.data))
      .catch((err) => console.log(err));
  }, []);

  // Tugas tersedia
  const taskAvailable = () => {
    const task = tasks.map((task) => {
      const length = task.tasks.filter((task) => task.status === "pending").length;
      return length;
    });
    const sum = task.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return sum;
  };

  // tugas selesai
  const taskCompleted = () => {
    const task = tasks.map((task) => {
      const length = task.tasks.filter((task) => task.status === "done").length;
      return length;
    });
    const sum = task.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return sum;
  };

  // Total Tugas
  const taskTotal = () => {
    let total = 0;
    tasks.forEach((item) => {
      total += item.tasks.length;
    });
    return total;
  };

  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <div className="flex flex-col justify-between w-full">
      <div className="flex w-full justify-between">
        <Card style={{ minWidth: "290px", maxHeight: "170px" }}>
          <RiseOutlined style={{ fontSize: "1.5em" }} />
          <Title level={4} style={{ marginTop: "10px", fontWeight: "bold" }}>
            Total tugas
          </Title>
          <Title
            level={1}
            style={{
              marginTop: "10px",
              marginBottom: "0px",
              fontWeight: "bold",
            }}
          >
            <Statistic value={taskTotal()} formatter={formatter} />
          </Title>
        </Card>

        <Card style={{ minWidth: "290px", maxHeight: "170px" }}>
          <ClockCircleOutlined style={{ fontSize: "1.5em" }} />
          <Title level={4} style={{ marginTop: "10px", fontWeight: "bold" }}>
            Tugas tersedia
          </Title>
          <Title
            level={1}
            style={{
              marginTop: "10px",
              marginBottom: "0px",
              fontWeight: "bold",
            }}
          >
            <Statistic value={taskAvailable()} formatter={formatter} />
          </Title>
        </Card>

        <Card style={{ minWidth: "290px", maxHeight: "170px" }}>
          <CheckOutlined style={{ fontSize: "1.5em" }} />
          <Title level={4} style={{ marginTop: "10px", fontWeight: "bold" }}>
            Tugas terselesaikan
          </Title>
          <Title
            level={1}
            style={{
              marginTop: "10px",
              marginBottom: "0px",
              fontWeight: "bold",
            }}
          >
            <Statistic value={taskCompleted()} formatter={formatter} />
          </Title>
        </Card>
      </div>

      <DueTask/>
    </div>
  );
};

export default Detail;
