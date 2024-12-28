import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Modal,
  Typography,
  Button,
  Space,
  Input,
  List,
  Card,
  message,
  Divider,
  ConfigProvider,
  Progress,
  Skeleton,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const TaskList = () => {
  const [selectedTask, setSelectedTask] = React.useState([]);
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, isLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Berhasil menghapus tugas',
    });
  };

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
    const fetchData = async () => {
      try {
        isLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/get`);
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        isLoading(false);
      }
    };
    fetchData();
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
      .put(`${import.meta.env.VITE_API_URL}/update/task/${selectedTask._id}`, {
        tasks: selectedTask.tasks,
      })
      .then((result) => {
        location.reload();
        console.log(selectedTask.tasks);
      })
      .catch((err) => console.log("Error:", err));
  };

  const deleteTask = async (index) => {
    try {
      const updatedDesc = [...selectedTask.tasks];
      updatedDesc.splice(index, 1);

      const result = await axios.put(
        `${import.meta.env.VITE_API_URL}/update/task/${selectedTask._id}`,
        {
          tasks: updatedDesc,
        }
      );

      console.log(result);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/get`);
      setTasks(response.data);
      success();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error", err);
    }
  };

  const navigation = useNavigate();
  const pindah = (record) => {
    navigation("/detail", { state: record });
  };

  const skeletons = [1, 2, 3, 4, 5, 6];

  const test = () => {
    console.log("==============Test==============");
  };

  return (
    <div className="cards">
      {contextHolder}
      {loading ? (
        <>
          {skeletons.map((_, index) => (
            <Card
              key={index}
              style={{
                marginTop: 16,
                width: 260,
                height: 200,
              }}
            >
              <Skeleton
                active
                title={{ width: "20%" }}
                paragraph={{ rows: 3 }}
              />
            </Card>
          ))}
        </>
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
              percent={
                task.tasks.length === 0
                  ? 0
                  : (
                      (task.tasks.filter((task) => task.status === "done")
                        .length /
                        task.tasks.length) *
                      100
                    ).toFixed(0)
              }
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
                <Button type="primary" onClick={() => pindah(selectedTask)}>
                  Detail Tugas
                </Button>
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
