import React, { useEffect, useState } from "react";
import axios from "axios";
import { DatePicker, Input, Select, Button, Space, Typography } from "antd";
const { Title } = Typography;

const AddTask = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedWorker, setselectedWorker] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/get");
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleDateChange = (date, dateString) => {
    const formattedDate = dateString.split("/").join("-");
    setDate(formattedDate);
  };

  const handleAdd = async () => {
    try {
      console.log(selectedWorker);

      const uuid = Date.now();
      const fullDate = new Date();
      const day = String(fullDate.getDate()).padStart(2, "0");
      const month = String(fullDate.getMonth() + 1).padStart(2, "0");
      const year = fullDate.getFullYear();
      const today = `${day}-${month}-${year}`;

      const newTask = {
        taskId: uuid,
        description: task,
        createdAt: today,
        dueTo: date,
        content: desc,
      };

      console.log(today);

      const response = await axios.get(`http://localhost:5000/get/`);
      const workers = response.data;

      console.log(
        `Dipilih: ${selectedWorker}\nTugas: ${newTask.description}\nTenggat: ${date}`
      );

      const worker = Object.values(workers).find(
        (worker) => worker.name === selectedWorker
      );

      if (worker) {
        console.log("Karyawan Ditemukan");
        worker.tasks.push(newTask);

        try {
          await axios.put(
            `http://localhost:5000/update/task/${worker._id}`,
            worker
          );
          location.reload();
        } catch (error) {
          console.error("Error updating task:", error);
        }
      } else {
        console.log("Karyawan tidak ditemukan");
      }
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  return (
    <>
      <Title level={3}>Tambah Tugas</Title>

      <Space direction="vertical" size>
        <Input
          className="inputTask"
          type="text"
          placeholder="Masukkan nama tugas"
          onChange={(e) => setTask(e.target.value)}
        />

        <Input
          className="inputTask"
          type="text"
          placeholder="Masukkan deskripsi"
          onChange={(e) => setDesc(e.target.value)}
        />

        <DatePicker
          className="inputTask"
          format={"DD/MM/YYYY"}
          placeholder="Tanggal tenggat"
          onChange={(date, dateString) => handleDateChange(date, dateString)}
        />

        <Select
          className="inputWorker"
          defaultValue="Pilih karyawan"
          onChange={(value) => setselectedWorker(value)}
          options={tasks.map((task) => ({
            value: `${task.name}`,
            label: `${task.name}`,
          }))}
        />

        <Button className="btnAdd" type="primary" onClick={handleAdd}>
          Tambah
        </Button>
      </Space>
    </>
  );
};

export default AddTask;
