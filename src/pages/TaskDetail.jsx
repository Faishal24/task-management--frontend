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
    // Buat objek baru hanya dengan atribut status yang diubah
    const updatedTask = { status: "done" };
    
    // Dapatkan ID tugas yang akan diperbarui
    const taskId = data.tasks[index].taskId;
    axios
      .put(`${import.meta.env.VITE_API_URL}/update/task/${data._id}/${taskId}`, updatedTask)
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
        .put(`${import.meta.env.VITE_API_URL}/update/task/${data._id}`, {
          tasks: newData,
        })
        .then((result) => {
          // navigation("/tugas");
          console.log(newData);
        })
        .catch((err) => console.log("Error:", err));

      setEditIndex(-1);
    }
  };

  const handleDownload = async (taskId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/download/${taskId}`,
        {
          responseType: "blob", // Mengatur responseType sebagai blob agar dapat mengunduh file
        }
      );


      console.log(response)
      // Mendapatkan header 'Content-Disposition' dari respons
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "downloaded-file"; // Nama file default

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (fileNameMatch && fileNameMatch.length === 2) {
          fileName = fileNameMatch[1];
        }
      }

      console.log("Content-Disposition:", contentDisposition);
      console.log("Extracted fileName:", fileName);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error:", error);
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
              <Tag color="blue" onClick={() => console.log(item)}>
                Telah Diserahkan
              </Tag>
            ) : (
              <Tag color="red">Belum Selesai</Tag>
            )
          }
          actions={[
            item.status === "submitted" ? (
              <Tooltip title="Unduh file">
                <DownloadOutlined
                  style={{ fontSize: 20 }}
                  onClick={() => handleDownload(item.taskId)}
                />
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
      {/* <button onClick={() => console.log(item)}>s</button> */}
    </>
  );
};

export default TaskDetail;
