import React from "react";
import { Card, Typography, Tag, Tooltip } from "antd";
import { DownloadOutlined, CheckOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const TaskDetail = () => {
  const locationD = useLocation();
  const data = locationD.state;
  const navigation = useNavigate()

  const updateTaskStatus = (index) => {
    const updatedTask = {...data.tasks[index], status: "done"};
    const updatedTasks = [...data.tasks];
    updatedTasks[index] = updatedTask;
    console.log(updatedTasks);
    axios
      .put(`http://localhost:5000/update/task/${data._id}`, {
        tasks: updatedTasks,
      })
      .then((result) => {
        navigation('/tugas')
      })
      .catch((err) => console.log("Error:", err));
  }

  return (
    <>
      <Title level={2} style={{ textAlign: "left", paddingTop: "0" }}>
        {data.name}
      </Title>
      {data.tasks.map((item, index) => (
        <Card
          key={index}
          type="inner"
          title={item.description}
          // extra={item.status == "done" ? <Tag color="green">Selesai</Tag> : <Tag color="red">Belum Selesai</Tag>}
          extra={
            item.status === "done" ? (
              <Tag color="green">Selesai</Tag>
            ) : item.status === "submitted" ? (
              <Tag color="blue">Telah Diserahkan</Tag>
            ) : (
              <Tag color="red">Belum Selesai</Tag>
            )
          }
          actions={[
            item.status === "submitted" ? (
              <Tooltip title="Unduh file">
                <DownloadOutlined style={{ fontSize: 20 }} />
              </Tooltip>
            ) : null,
            item.status === "submitted" ? (
              <Tooltip title="Setujui tugas">
                <CheckOutlined style={{ fontSize: 20 }} onClick={() => updateTaskStatus(index)}/>
              </Tooltip>
            ) : null,
          ]}
        >
          {item.content}
          {/* <button onClick={() => navigation('/tugas')}>s</button> */}
        </Card>
      ))}
    </>
  );
};

export default TaskDetail;
