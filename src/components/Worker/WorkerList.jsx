import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Empty,
  Space,
  Table,
  Tag,
  Popconfirm,
  Skeleton,
  Select,
  Modal,
  Input,
  InputNumber,
  message,
  Button,
  Typography,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

const { Text } = Typography;

const WorkerList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [worker, setWorker] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState()
  const workerWithIndex = worker.map((item, index) => ({
    ...item,
    index: index + 1,
  }));
  const [messageApi, contextHolder] = message.useMessage();

  ///////////// Modal /////////////
  const showModal = (record) => {
    setIsModalOpen(true);
    setInput(record);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [input, setInput] = useState([]);

  const handleChange = (e, key) => {
    const { value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  ////////////////////////////////

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Berhasil menghapus data karyawan!',
    });
  };

  const handleDelete = async (_id) => {
    // axios
    //   .delete(`${import.meta.env.VITE_API_URL}/delete/${_id}`)
    //   .then((result) => {
    //     location.reload();
    //   })
    //   .catch((err) => console.log("Error", err));
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/delete/${_id}`)
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/get`);
      setWorker(result.data);
      success()
    } catch (error) {
      console.log(error)
    }
  };

  const handleEdit = () => {
    delete input.__v
    delete input.index
    axios
      .put(`${import.meta.env.VITE_API_URL}/update/user/${input._id}`, input)
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log("Error", err));
  }

  const navigation = useNavigate()
  const pindah = (record) => {
    navigation('/profil', {state: record})
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
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend"],
      render: (text, record) => <a onClick={() => pindah(record)}>{text}</a>,
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
            title="Hapus karyawan"
            description="Apakah yakin untuk menghapus karyawan?"
            onConfirm={() => handleDelete(record._id)}
            okText="Ya"
            cancelText="Tidak"
            placement="left"
          >
            <Space direction="vertical">
              <a>
                <DeleteOutlined
                  style={{ color: "#fa541c", fontSize: "18px" }}
                />
              </a>
            </Space>
          </Popconfirm>
          <a>
            <EditOutlined
              style={{ color: "#4096ff", fontSize: "18px" }}
              onClick={() => showModal(record)}
            />
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/get`);
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
    <>
      {contextHolder}
      <div className="table">
        {/* <Skeleton loading={loading} active> */}
        <Table
          columns={columns}
          dataSource={workerWithIndex}
          // pagination={{ position:["bottomCenter"] }}
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
                  lineHeight: "2em",
                }}
              />
            ) : (
              <Empty />
            ),
          }}
        />
      </div>

      <Modal
        title="Ubah Detail Karyawan"
        open={isModalOpen}
        onOk={handleEdit}
        onCancel={handleCancel}
      >
        <Space
          direction="horizontal"
          size="middle"
          style={{ marginTop: "1em" }}
        >
          <Space direction="vertical" size={26}>
            <Text>Nama</Text>
            <Text>Umur</Text>
            <Text>Jenis Kelamin</Text>
            <Text>Alamat</Text>
            <Text>No. Telepon</Text>
            <Text>Email</Text>
            <Text>Devisi</Text>
          </Space>
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Space direction="horizontal">
              <Input
                style={{ width: "205%" }}
                placeholder={input.name}
                value={isModalOpen == false ? null : input.name}
                onChange={(e) => handleChange(e, "name")}
              />
            </Space>

            <Space direction="horizontal">
              <Input
                style={{ width: "205%" }}
                placeholder={input.age}
                value={isModalOpen == false ? null : input.age}
                onChange={(e) => handleChange(e, "age")}
              />
            </Space>

            <Space direction="horizontal">
              <Input
                style={{ width: "205%" }}
                placeholder={input.address}
                value={isModalOpen == false ? null : input.address}
                onChange={(e) => handleChange(e, "address")}
              />
            </Space>

            <Select
              style={{ width: "205%" }}
              placeholder="Jenis kelamin"
              value={input.gender}
              onChange={(value) =>
                setInput((prevKaryawan) => ({
                  ...prevKaryawan,
                  gender: value,
                }))
              }
              options={[
                { value: "male", label: "Laki-laki" },
                { value: "female", label: "Perempuan" },
              ]}
            />

            <Space direction="horizontal">
              <Input
                style={{ width: "205%" }}
                placeholder={input.phone}
                value={isModalOpen == false ? null : input.phone}
                onChange={(e) => handleChange(e, "phone")}
              />
            </Space>

            <Space direction="horizontal">
              <Input
                style={{ width: "205%" }}
                placeholder={input.email}
                value={isModalOpen == false ? null : input.email}
                onChange={(e) => handleChange(e, "email")}
              />
            </Space>

            <Select
              style={{ width: "205%" }}
              placeholder="Pilih devisi"
              value={input.devision}
              onChange={(value) =>
                setInput((prevKaryawan) => ({
                  ...prevKaryawan,
                  devision: value,
                }))
              }
              options={[
                { value: "pemasaran", label: "Keuangan" },
                { value: "riset", label: "Riset" },
                { value: "produksi", label: "Produksi" },
                { value: "keuangan", label: "Keuangan" },
                { value: "hubungan petani", label: "Hubungan Petani" },
                { value: "hubungan masyarakat", label: "Hubungan Masyarakat" },
                { value: "it", label: "IT" },
              ]}
            />
          </Space>
          {/* <Button onClick={() => console.log(input)}>Click Me</Button> */}
        </Space>
      </Modal>
    </>
  );
};

export default WorkerList;
