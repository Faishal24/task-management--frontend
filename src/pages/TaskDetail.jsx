import React, { useEffect, useState } from "react";
import { Card, Input, Space, Typography, Tag, Tooltip } from "antd";
import {
  DownloadOutlined,
  CheckOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const TaskDetail = () => {
  const [editIndex, setEditIndex] = useState(-1);
  const [editedDesc, setEditedDesc] = useState("");
  const locationD = useLocation();
  const data = locationD.state;
  const navigation = useNavigate();

  const updateTaskStatus = (index) => {
    const updatedTask = { ...data.tasks[index], status: "done" };
    const updatedTasks = [...data.tasks];
    updatedTasks[index] = updatedTask;
    console.log(updatedTasks);
    axios
      .put(`http://localhost:5000/update/task/${data._id}`, {
        tasks: updatedTasks,
      })
      .then(() => {
        navigation("/tugas");
      })
      .catch((err) => console.log("Error:", err));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDescriptionChange = (event, index) => {
    setEditedDesc(event.target.value);

    if (event.key === "Enter") {
      const newData = [...data.tasks];
      newData[index].content = editedDesc;

      axios
        .put(`http://localhost:5000/update/task/${data._id}`, {
          tasks: newData,
        })
        .then((result) => {
          // navigation("/tugas");
          console.log(result);
        })
        .catch((err) => console.log("Error:", err));

      setEditIndex(-1);
    }
  };

  return (
    <>
      <Space className="title">
        <Title level={2} style={{ textAlign: "left", paddingTop: "0" }}>
          {data.name}
        </Title>
        <Title
          level={5}
          style={{
            marginTop: "0px",
            paddingBottom: "0px",
            opacity: "50%",
          }}
        >
          {data.devision == "riset"
            ? "Riset"
            : data.devision == "produksi"
            ? "Produksi"
            : data.devision == "keuangan"
            ? "Keuangan"
            : data.devision == "it"
            ? "IT"
            : data.devision == "hubungan petani"
            ? "Hubungan Petani"
            : data.devision == "hubungan masyarakat"
            ? "Hubungan Masyarakat"
            : data.devision == "pemasaran"
            ? "Pemasaran"
            : null}
        </Title>
      </Space>
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
                <CheckOutlined
                  style={{ fontSize: 20 }}
                  onClick={() => updateTaskStatus(index)}
                />
              </Tooltip>
            ) : null,
            <Tooltip title="Edit deskripsi">
              <EditOutlined onClick={() => handleEdit(index)} />
            </Tooltip>,
          ]}
        >
          {editIndex == index ? (
            <Tooltip title="Tekan enter untuk menyimpan">
              <Input
                defaultValue={item.content}
                onChange={(event) => handleDescriptionChange(event, index)}
                onKeyDown={(event) => handleDescriptionChange(event, index)}
              />
            </Tooltip>
          ) : (
            item.content
          )}
        </Card>
      ))}
      {/* <button onClick={() => console.log(updatedTasks)}>s</button> */}
    </>
  );
};

export default TaskDetail;
