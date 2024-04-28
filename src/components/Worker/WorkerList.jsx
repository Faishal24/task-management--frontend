import React, { useEffect, useState } from "react";
import { Empty, Space, Table, Tag, Popconfirm, Skeleton } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

const WorkerList = ({showModal}) => {
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Divisi",
      key: "devision",
      dataIndex: "devision",
      sorter: (a, b) => a.devision.localeCompare(b.devision),
      sortDirections: ["ascend", "descend"],
      filters: [
        {
          text: "Riset",
          value: "riset",
        },
        {
          text: "Keuangan",
          value: "keuangan",
        },
        {
          text: "Hubungan Masyarakat",
          value: "hubungan masyarakat",
        },
        {
          text: "Hubungan Petani",
          value: "hubungan petani",
        },
        {
          text: "Pemasaran",
          value: "pemasaran",
        },
        {
          text: "Produksi",
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
            placement="left"
          >
            <Space direction="vertical">
              <a><DeleteOutlined style={{ color: "#fa541c", fontSize: "18px" }} /></a>
            </Space>
          </Popconfirm>
          <a>
            <EditOutlined 
              style={{ color: "#4096ff", fontSize: "18px" }} 
              onClick={() => showModal(record)}/>
          </a>
        </Space>
      ),
    },
  ];

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/get");
        setWorker(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table">
      {/* <Skeleton loading={loading} active> */}
      <Table
        columns={columns}
        dataSource={workerWithIndex}
        pagination={false}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
        locale={{
          emptyText: loading ? (
            <Skeleton 
              active
              title={false} 
              paragraph={{ rows: 15 }} 
              style={{
                lineHeight: "2em"
              }}  
            />
          ) : (
            <Empty />
          ),
        }}
      />
      {/* </Skeleton> */}
    </div>
  );
};

export default WorkerList;
