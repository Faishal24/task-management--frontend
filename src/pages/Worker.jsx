import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const Worker = () => {
  return (
    <div>
      <Title
        level={2}
        style={{
          textAlign: "Left",
          paddingTop: "0px",
          marginTop: "0px",
          marginBottom: "24px",
        }}
      >
        Daftar Karyawan
      </Title>
    </div>
  );
};

export default Worker;
