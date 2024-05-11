import React, { useRef, useState, useEffect } from "react";
import { Button, List, Table, Typography, Space } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import generatePDF, { Margin } from "react-to-pdf";

const { Text } = Typography;

const Report = () => {
  const [workers, setWorkers] = useState([]);

  const dataSource = workers.map((worker, index) => ({
    key: index.toString(),
    name: worker.name,
    age: worker.age,
    address: worker.address,
    tasks: worker.tasks.map((task) => task.description), //.join(', ') // Mengubah array tugas menjadi string
    tasksStatus: worker.tasks.map((task) => task.status),
    dueDate: worker.tasks.map((task) => task.dueTo),
    devision: worker.devision,
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
      title: "Nama",
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
      title: "Status Tugas",
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
      title: "Tanggal Pembuatan Tugas",
      dataIndex: "",
      key: "",
    },
    {
      title: "Tenggat Tugas",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => (
        <List
          size="middle"
          dataSource={text}
          renderItem={(item, index) => <List.Item>{item}</List.Item>}
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
      .get("http://localhost:5000/get")
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
      <Button type="primary" onClick={() => generatePDF(targetRef, options)}
        style={{marginBottom: "1em"}}
      >
        Download Laporan
      </Button>
      <div ref={targetRef}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
        />
      </div>
    </>
  );
};

export default Report;
