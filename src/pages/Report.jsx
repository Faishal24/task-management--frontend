import { useRef, useState, useEffect } from "react";
import { Button, ConfigProvider, Flex, List, Table, Typography } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import generatePDF, { Margin } from "react-to-pdf";

const { Title, Text } = Typography;

const Report = () => {
  const [workers, setWorkers] = useState([]);

  const dataSource = workers.map((worker) => ({
    name: worker.name,
    age: worker.age,
    address: worker.address,
    tasks: worker.tasks.map((task) => task.description),
    tasksStatus: worker.tasks.map((task) => task.status),
    dueDate: worker.tasks.map((task) => task.dueTo),
    devision: worker.devision,
    createdAt: worker.tasks.map((task) => task.createdAt)
  }));

  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      })
      .join(" ");
  };

  const columns = [
    // USER & DIVISION
    {
      title: "Nama Karyawan",
      dataIndex: "name",
      key: "name",
      // fixed: "left",
      render: (text) => <Text>{text || "-"}</Text>,
    },
    {
      title: "Divisi",
      dataIndex: "devision",
      key: "devision",
      render: (text) => <Text>{text ? toCamelCase(text) : "-"}</Text>,
    },
  
    // TASK DETAILS
    {
      title: "Judul Tugas",
      dataIndex: "tasks",
      key: "tasks",
      render: (text) => (
        <List
          size="small"
          dataSource={text || []}
          renderItem={(item, index) => (
            <List.Item>{index + 1}. {item || "-"}</List.Item>
          )}
        />
      ),
    },
    {
      title: "Deskripsi",
      dataIndex: "taskDescriptions",
      key: "taskDescriptions",
      render: (text) => (
        <List
          size="small"
          dataSource={text || []}
          renderItem={(item) => <List.Item>{item || "-"}</List.Item>}
        />
      ),
    },
    {
      title: "Prioritas",
      dataIndex: "taskPriorities",
      key: "taskPriorities",
      render: (text) => (
        <List
          size="small"
          dataSource={text || []}
          renderItem={(item) => <List.Item>{item || "-"}</List.Item>}
        />
      ),
    },
    {
      title: "Deadline",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => (
        <List
          size="small"
          dataSource={text || []}
          renderItem={(item) => <List.Item>{item || "-"}</List.Item>}
        />
      ),
    },
    {
      title: "Tanggal Pembuatan",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <List
          size="small"
          dataSource={text || []}
          renderItem={(item) => <List.Item>{item || "-"}</List.Item>}
        />
      ),
    },
  
    // TASK STATUS
    {
      title: "Status Tugas",
      dataIndex: "tasksStatus",
      key: "tasksStatus",
      render: (text) => (
        <List
          size="small"
          dataSource={text || []}
          renderItem={(item, idx) => (
            <List.Item key={idx}>
              {item === "done" ? <><CheckOutlined /> Selesai</> :
               item === "submitted" ? <><ClockCircleOutlined /> Diserahkan</> :
               item === "pending" ? <><CloseOutlined /> Belum Selesai</> :
               "-"}
            </List.Item>
          )}
        />
      ),
    },
  
    // TASK REPORT
    {
      title: "Tanggal Lapor",
      dataIndex: "reportDates",
      key: "reportDates",
      render: (text) => (
        <List
          size="small"
          dataSource={text || []}
          renderItem={(item) => <List.Item>{item || "-"}</List.Item>}
        />
      ),
    },
    {
      title: "Isi Laporan",
      dataIndex: "reportTexts",
      key: "reportTexts",
      render: (text) => (
        <List
          size="small"
          dataSource={text || []}
          renderItem={(item) => <List.Item>{item || "-"}</List.Item>}
        />
      ),
    },
    {
      title: "Pelapor",
      dataIndex: "reportedBy",
      key: "reportedBy",
      render: (text) => <Text>{text || "-"}</Text>,
    },
  
    // TASK REVIEW
    {
      title: "Reviewer",
      dataIndex: "reviewer",
      key: "reviewer",
      render: (text) => <Text>{text || "-"}</Text>,
    },
    {
      title: "Komentar Review",
      dataIndex: "reviewComments",
      key: "reviewComments",
      render: (text) => (
        <List
          size="small"
          dataSource={text || []}
          renderItem={(item) => <List.Item>{item || "-"}</List.Item>}
        />
      ),
    },
  
    // TASK ATTACHMENT
    {
      title: "Nama File",
      dataIndex: "fileNames",
      key: "fileNames",
      render: (text) => (
        <List
          size="small"
          dataSource={text || []}
          renderItem={(item) => <List.Item>{item || "-"}</List.Item>}
        />
      ),
    },
    {
      title: "Tanggal Upload",
      dataIndex: "uploadDates",
      key: "uploadDates",
      render: (text) => (
        <List
          size="small"
          dataSource={text || []}
          renderItem={(item) => <List.Item>{item || "-"}</List.Item>}
        />
      ),
    },
  ];
  

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/get`)
      .then((result) => setWorkers(result.data));
  });

  //////////////////
  ///// To PDF /////
  //////////////////
  const targetRef = useRef();
  const options = {
    page: {
      margin: Margin.MEDIUM,
    },
  };

  return (
    <>
      {/* <Space> */}
      <Flex align="center" justify="space-between" style={{marginBottom: 10}}>
        <Title level={2} align="center" style={{paddingTop: 0}}>
          Laporan
        </Title>
        <Button type="primary" onClick={() => generatePDF(targetRef, options)} style={{fontWeight: "500"}}>
          Download Laporan
        </Button>
      </Flex>
      {/* </Space> */}
      <div ref={targetRef}>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                borderColor: "#dedede",
                headerBg: "#1677ff",
                headerColor: "#fafafa",
                // cellFontSize: 16
              },
            },
            token: {
              fontSize: 16
            }
          }}
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
            scroll={{ x: 2800 }}
          />
        </ConfigProvider>
      </div>
    </>
  );
};

export default Report;
