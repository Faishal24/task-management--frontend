import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Typography,
  Button,
  Space,
  Input,
  List,
  Card,
  Divider,
  ConfigProvider,
  Progress,
  Popconfirm,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const TaskList = () => {
  const [selectedTask, setSelectedTask] = React.useState([]);
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);

  ///////// Modal /////////
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setEdit(false);
    setIsModalOpen(false);
  };
  /////////////////////////

  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => setTasks(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const updatedDesc = [...selectedTask.tasks];
    updatedDesc[index] = { ...updatedDesc[index], description: value };

    // Hapus tugas jika inputan kosong
    // if (value.trim() === "") {
    //   updatedDesc.splice(index, 1);
    // }

    setSelectedTask({ ...selectedTask, tasks: updatedDesc });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:5000/update/task/${selectedTask._id}`, {
        tasks: selectedTask.tasks,
      })
      .then((result) => {
        location.reload();
      })
      .catch((err) => console.log("Error:", err));
  };
  
  const deleteTask = (index) => {
    const updatedDesc = [...selectedTask.tasks];
    updatedDesc.splice(index, 1);
    axios
      .put(`http://localhost:5000/update/${selectedTask._id}`, {
        tasks: updatedDesc,
      })
      .then((result) => {
        console.log(result);
        location.reload();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const test = () => {
    console.log("==============Test==============");
  };

  return (
    <div className="cards">
      {tasks.length === 0 ? (
        <p>Belum ada karyawan.</p>
      ) : (
        tasks.map((task) => (
          <Card
            style={{
              marginTop: 16,
              width: 260,
            }}
            headStyle={{ backgroundColor: "#1677ff", color: "white" }}
            type="inner"
            title={task.name}
            onClick={() => showModal(task)}
          >
            {task.tasks.slice(0, 3).map((task, index) => (
              <p key={index}>
                {index + 1}. {task.description}
              </p>
            ))}
            {task.tasks.length > 3 && (
              <ConfigProvider
                theme={{
                  token: {
                    colorSplit: "#aaaaaa",
                    verticalMarginInline: 1,
                    margin: 0,
                  },
                }}
              >
                <Divider plain style={{ color: "#aaaaaa" }}>
                  More
                </Divider>
              </ConfigProvider>
            )}
            {task.tasks.length == 0 && (
              <ConfigProvider
                theme={{
                  token: {
                    colorSplit: "#aaaaaa",
                  },
                }}
              >
                <Divider plain style={{ color: "#aaaaaa" }}>
                  Belum Ada Tugas
                </Divider>
              </ConfigProvider>
            )}
            <Progress
              steps={task.tasks.length}
              percent={
                task.tasks.length === 0
                  ? 0
                  : (
                      (task.tasks.filter((task) => task.isDone === true)
                        .length /
                        task.tasks.length) *
                      100
                    ).toFixed(0)
              }
              size={20}
            />
          </Card>
        ))
      )}

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Space>
            {edit ? (
              <>
                <Button key="back" onClick={handleEdit}>
                  Kembali
                </Button>
                <Button type="primary" onClick={handleSave}>
                  Simpan
                </Button>
              </>
            ) : (
              <>
                <Button key="back" onClick={handleEdit}>
                  Ubah
                </Button>
                <Button type="primary">Detail Tugas</Button>
              </>
            )}
          </Space>,
        ]}
      >
        <Title level={4}>{selectedTask.name}</Title>
        <div>
          {edit ? (
            <List
              dataSource={selectedTask.tasks}
              renderItem={(item, index) => (
                <List.Item>
                  <Input
                    className="EditTask"
                    type="text"
                    value={item.description}
                    onChange={(e) => handleInputChange(e, index)}
                    suffix={
                      <DeleteOutlined onClick={() => deleteTask(index)} />
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <List
              dataSource={selectedTask.tasks}
              renderItem={(item, index) => (
                <List.Item>
                  {index + 1}. {item.description}
                </List.Item>
              )}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TaskList;
