import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Popconfirm } from "antd";
import axios from "axios";

const WorkerList = () => {
  const [worker, setWorker] = useState([]);
  const workerWithIndex = worker.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/delete/${selectedTask._id}`)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log("Error", err));
  };

  const test = (test) => {
    console.log(test)
  }

  const columns = [
    {
      title: "No",
      dataIndex: "index",
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Umur",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Alamat",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Jenis Kelamin",
      dataIndex: "gender",
      key: "gender",
      render: (text) => (text == "male" ? <p>Laki-laki</p> : <p>Perempuan</p>),
    },
    {
      title: "No. Telepon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Divisi",
      key: "devision",
      dataIndex: "devision",
      render: (_, { devision }) => {
        let color = "magenta"; // Default color
        if (devision === "pemasaran") {
          color = "red";
        } else if (devision === "riset") {
          color = "volcano";
        } else if (devision === "produksi") {
          color = "orange";
        } else if (devision === "keuangan") {
          color = "gold";
        } else if (devision === "hubungan petani") {
          color = "lime";
        } else if (devision === "hubungan masyarakat") {
          color = "green";
        }
        return <Tag color={color}>{devision.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_) => (
        <Space size="middle">
          <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => test(task)}
                  okText="Yes"
                  cancelText="No"
                >
                  <a style={{color: "#fa541c"}}>
                    Hapus
                  </a>
                </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => setWorker(result.data));
  });
  

  return (
    <div className="table">
      <Table
        columns={columns}
        dataSource={workerWithIndex}
        pagination={{ position: [] }}
      />
    </div>
  );
};

export default WorkerList;
