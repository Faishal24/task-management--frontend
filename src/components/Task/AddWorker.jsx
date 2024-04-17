import React, { useState } from "react";
import axios from "axios";
import {Input, Button, Space, Typography } from "antd";

const {Title} = Typography

const AddWorker = () => {
  const [karyawan, setKaryawan] = useState("");
  const [selectedWorker, setselectedWorker] = useState("");

  const handleAddWorker = () => {
    const newWorker = {
      name: karyawan,
    };

    axios.get(`http://localhost:5000/get/`).then((response) => {
      const workers = response.data;

      const worker = Object.values(workers).find(
        (worker) => worker.name == selectedWorker
      );
      console.log(workers);

      if (!worker) {
        console.log("Karyawan Belum Ada");
        axios
          .post(`http://localhost:5000/add`, newWorker)
          .then((result) => {
            console.log("Berhasil ditambahkan");
            console.log(result);
            location.reload();
          })
          .catch((err) => console.error("Error adding worker:", err));
      } else {
        console.log("Karyawan Sudah Ada");
      }
    });
  };
  return (
    <>
      <Title level={3}>Tambah Karyawan</Title>
      <Space direction="vertical" size={0}>
        <Input
          className="inputWorker"
          type="text"
          placeholder="Masukkan nama..."
          onChange={(e) => setKaryawan(e.target.value)}
        />
        <Button type="primary" onClick={handleAddWorker}>
          Tambah
        </Button>
      </Space>
    </>
  );
};

export default AddWorker;
