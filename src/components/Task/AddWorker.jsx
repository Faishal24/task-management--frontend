import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Select, Space, Typography } from "antd";

const { Title } = Typography;

const AddWorker = () => {
  const [karyawan, setKaryawan] = useState([]);
  const [selectedWorker, setselectedWorker] = useState("");
  const devisi = [
    "pemasaran",
    "riset",
    "produksi",
    "keuangan",
    "hubungan petani",
    "hubungan masyarakat",
  ];

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

  const test = () => {
    console.log(devisi);
  };

  return (
    <>
      <Title level={3}>Tambah Karyawan</Title>
      <Space direction="vertical" size={20}>
        <Input
          className="inputWorker"
          type="text"
          placeholder="Nama"
          name="name"
          onChange={(e) => setKaryawan(e.target.value)}
        />
        <Input
          className="inputWorker"
          type="int"
          placeholder="Umur"
          name="age"
          onChange={(e) => setKaryawan(e.target.value)}
        />
        <Input
          className="inputWorker"
          type="text"
          placeholder="Alamat"
          name="address"
          onChange={(e) => setKaryawan(e.target.value)}
        />
        <Select
          className="inputWorker"
          type="text"
          placeholder="Jenis Kelamin"
          name="gender"
          onChange={(e) => setKaryawan(e.target.value)}
          options={[
            {value: "male", label: "Laki-laki"},
            {value: "female", label: "Perempuan"}
          ]}
        />
        <Input
          className="inputWorker"
          type="text"
          placeholder="No. Telepon"
          name="phone"
          onChange={(e) => setKaryawan(e.target.value)}
        />
        <Select
          className="inputWorker"
          defaultValue="Pilih devisi"
          onChange={(e) => setKaryawan(e.target.value)}
          options={devisi.map((dev) => ({
            value: dev,
            label: dev,
          }))}
        />
        <Button className="btnAdd" type="primary" onClick={test}>
          Tambah
        </Button>
      </Space>
    </>
  );
};

export default AddWorker;
