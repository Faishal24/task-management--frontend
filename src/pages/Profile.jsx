import React, { useState, useEffect } from "react";
import { ConfigProvider, Image, Space, Table, Tag } from "antd";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();

  const columns = [
    {
      title: "Nama",
      dataIndex: "key",
      key: "key",
    },
    {
      title: `${location.state.name}`,
      dataIndex: "value",
      key: "value",
    },
  ];
  const data = [
    {
      key: "Umur",
      value: `${location.state.age}`,
    },
    {
      key: "Alamat",
      value: `${location.state.address}`,
    },
    {
      key: "Jenis Kelamin",
      value: `${location.state.gender}`,
    },
    {
      key: "No. Telepon",
      value: `${location.state.phone}`,
    },
    {
      key: "Devisi",
      value: `${location.state.devision}`,
    },
    {
      key: "Email",
      value: `${location.state.email}`,
    },
  ];

  ////////////////////
  ////// Devisi //////
  ////////////////////
  const devisionMap = {
    keuangan: "Keuangan",
    riset: "Riset",
    produksi: "Produksi",
    "hubungan petani": "Hubungan Petani",
    "hubungan masyarakat": "Hubungan Masyarakat",
    pemasaran: "Pemasaran",
  };

  const newData = data.map((item) => {
    if (item.key === "Devisi" && devisionMap[item.value]) {
      return { ...item, value: devisionMap[item.value] };
    }
    if (item.key === "Jenis Kelamin" && item.value === "male") {
      return { ...item, value: "Laki-laki" };
    }
    if (item.key === "Jenis Kelamin" && item.value === "female") {
      return { ...item, value: "Perempuan" };
    }
    return item;
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2em" }}>
        <Image
          width={250}
          src={`https://ui-avatars.com/api/?size=300&name=${location.state.name}`}
          style={{
            borderRadius: "50%",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                borderColor: "#d9d9d9",
              },
            },
          }}
        >
          <Table
            dataSource={newData}
            columns={columns}
            pagination={false}
            bordered
            style={{
              minWidth: "800px",
            }}
          />
        </ConfigProvider>
      </div>
      {/* <button onClick={() => console.log(location.state.name)}>S</button> */}
    </>
  );
};

export default Profile;
