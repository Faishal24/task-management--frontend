import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Select, Space, Typography } from "antd";

const { Title } = Typography;

const AddWorker = () => {
  const [karyawan, setKaryawan] = useState({
    name: "",
    age: "",
    address: "",
    gender: "",
    phone: "",
    devision: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKaryawan((prevKaryawan) => ({
      ...prevKaryawan,
      [name]: value,
    }));
  };

  const handleAddWorker = () => {
    axios
      .post("http://localhost:5000/add", karyawan)
      .then((result) => {
        console.log("Berhasil");
        location.reload();
      })
      .catch((err) => console.log(err));
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
          value={karyawan.name}
          onChange={handleInputChange}
        />
        <Input
          className="inputWorker"
          type="int"
          placeholder="Umur"
          name="age"
          value={karyawan.age}
          onChange={handleInputChange}
        />
        <Input
          className="inputWorker"
          type="text"
          placeholder="Alamat"
          name="address"
          value={karyawan.address}
          onChange={handleInputChange}
        />
        <Select
          className="inputWorker"
          type="text"
          name="gender"
          placeholder="Jenis Kelamin"
          value={karyawan.gender}
          onChange={(value) =>
            setKaryawan((prevKaryawan) => ({
              ...prevKaryawan,
              gender: value,
            }))
          }
          options={[
            { value: "male", label: "Laki-laki" },
            { value: "female", label: "Perempuan" },
          ]}
        />
        <Input
          className="inputWorker"
          type="text"
          placeholder="No. Telepon"
          name="phone"
          value={karyawan.phone}
          onChange={handleInputChange}
        />
        <Input
          className="inputWorker"
          type="email"
          placeholder="Email"
          name="email"
          value={karyawan.email}
          onChange={handleInputChange}
        />
        <Select
          className="inputWorker"
          placeholder="Pilih devisi"
          value={karyawan.devision}
          onChange={(value) =>
            setKaryawan((prevKaryawan) => ({
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
          ]}
        />
        <Button className="btnAdd" type="primary" onClick={handleAddWorker}>
          Tambah
        </Button>
      </Space>
    </>
  );
};

export default AddWorker;
