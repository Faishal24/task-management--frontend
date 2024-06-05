import React, { useRef, useState, useEffect } from "react";
import { Button, ConfigProvider, Flex, List, Table, Typography, Space } from "antd";
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
    {
      title: "Nama Karyawan",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tugas",
      dataIndex: "tasks",
      key: "tasks",
      render: (text) => (
        <List
          size="middle"
          dataSource={text}
          renderItem={(item, index) => (
            <List.Item>
              {index + 1}. {item}
            </List.Item>
          )}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "tasksStatus",
      key: "tasksStatus",
      render: (text) => (
        <>
          <List
            size="middle"
            dataSource={text}
            renderItem={(item, index) => (
              <List.Item>
                {item == "done" ? (
                  <>
                    <CheckOutlined /> <Text>Selesai</Text>
                  </>
                ) : item == "submitted" ? (
                  <>
                    <ClockCircleOutlined /> <Text>Diserahkan</Text>
                  </>
                ) : item == "pending" ? (
                  <>
                    <CloseOutlined /> <Text>Belum Selesai</Text>
                  </>
                ) : null}
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      title: "Tanggal Pembuatan",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <List
          size="middle"
          dataSource={text}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
    {
      title: "Batas Akhir",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => (
        <List
          size="middle"
          dataSource={text}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
    {
      title: "Devisi",
      dataIndex: "devision",
      key: "devision",
      render: (text) =>
        text == "it" ? <Text>IT</Text> : <Text>{toCamelCase(text)}</Text>,
    },
  ];

  useEffect(() => {
    axios
      .get(`http://${import.meta.env.VITE_API_URL}/get`)
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
          />
        </ConfigProvider>
      </div>
    </>
  );
};

export default Report;
