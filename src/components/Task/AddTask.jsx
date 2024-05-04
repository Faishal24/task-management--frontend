import React, { useEffect, useState } from "react";
import axios from "axios";
import { DatePicker, Input, Select, Button, Space, Typography } from "antd";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// dayjs.extend(customParseFormat);
const {Title} = Typography

const AddTask = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedWorker, setselectedWorker] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => setTasks(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDateChange = (date, dateString) => {
    const formattedDate = dateString.split("/").join("-");
    setDate(formattedDate);
  };

  const handleAdd = () => {
    console.log(selectedWorker);
    const newTask = {
      description: task,
      dueTo: date,
      content: desc
    };

    axios.get(`http://localhost:5000/get/`).then((response) => {
      const workers = response.data;
      console.log(
        `Dipilih: ${selectedWorker}\nTugas: ${newTask.description}\nTenggat: ${date}`
      );

      const worker = Object.values(workers).find(
        (worker) => worker.name == selectedWorker
      );
      // console.log(workers);

      if (worker) {
        console.log("Karyawan Ditemukan");
        worker.tasks.push(newTask);
        axios
          .put(`http://localhost:5000/update/task/${worker._id}`, worker)
          .then((result) => {
            console.log("Berhasil ditambahkan");
            console.log(result);
            location.reload();
          })
          .catch((err) => console.error("Error adding task:", err));
      } else {
        console.log("Karyawan tidak ditemukan");
      }
    });
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
