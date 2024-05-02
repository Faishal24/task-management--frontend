import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography

const TaskDetail = () => {
  return (
    <>
      <Title level={2} style={{textAlign:"left", paddingTop:"0"}}>Nama</Title>
      <Card
        type="inner"
        title="Judul tugas"
        extra={<a href="#">More</a>}
      >
        bukti tugas
      </Card>
    </>
  );
};

export default TaskDetail;
