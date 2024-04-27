import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const DateComponent = () => {
  // Tanggal
  const d = new Date();
  const day = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "December",
  ];
  const date = `${day[d.getDay()]}, ${d.getDate()} ${
    month[d.getMonth()]
  } ${d.getFullYear()}`;
  return (
    <div>
      <Title
        level={5}
        style={{
          marginTop: "0px",
          paddingBottom: "0px",
          opacity: "50%",
        }}
      >
        {date}
      </Title>
    </div>
  );
};

export default DateComponent;
