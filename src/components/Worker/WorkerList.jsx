import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";

const WorkerList = () => {
  const [worker, setWorker] = useState([]);
  const workerWithIndex = worker.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

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
          <a onClick={() => console.log(workerWithIndex)}>Delete</a>
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
