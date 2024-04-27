import React, { useEffect, useState } from "react";
import { ConfigProvider, Space, Table, Tag, Popconfirm } from "antd";
import axios from "axios";

const WorkerList = () => {
  const [worker, setWorker] = useState([]);
  const workerWithIndex = worker.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:5000/delete/${_id}`)
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log("Error", err));
  };

  const test = (_id) => {
    console.log(_id);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "index",
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend"],
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
      sorter: (a, b) => a.devision.localeCompare(b.devision),
      sortDirections: ["ascend"],
      filters: [
        {
          text: "riset",
          value: "riset",
        },
        {
          text: "keuangan",
          value: "keuangan",
        },
        {
          text: "hubungan masyarakat",
          value: "hubungan masyarakat",
        },
        {
          text: "hubungan petani",
          value: "hubungan petani",
        },
        {
          text: "pemasaran",
          value: "pemasaran",
        },
        {
          text: "produksi",
          value: "produksi",
        },
      ],
      onFilter: (value, record) => record.devision.indexOf(value) === 0,
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
      title: "Aksi",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <a style={{ color: "#fa541c" }}>Hapus</a>
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
      <ConfigProvider
        theme={{
          components: {
            Table: {
              // cellFontSize: 15,
              cellPaddingInline: 25,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={workerWithIndex}
          pagination={{ position: [] }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default WorkerList;
