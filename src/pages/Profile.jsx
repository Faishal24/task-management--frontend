import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();

  const columns = [
    {
      // title: 'Key',
      dataIndex: "key",
      key: "key",
    },
    {
      // title: 'Value',
      dataIndex: "value",
      key: "value",
    },
  ];
  const data = [
    {
      key: "Nama",
      value: `${location.state.name}`,
    },
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
      key: "Devision",
      value: `${location.state.devision}`,
    },
    {
      key: "Email",
      value: `${location.state.email}`,
    },
  ];
  return (
    <>
      <Table dataSource={data} columns={columns} pagination={false} />
      <button onClick={() => console.log(location.state)}>S</button>
    </>
  );
};

export default Profile;
