import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography

const TaskDetail = () => {
  return (
    <>
      <Title level={2} style={{textAlign:"left", paddingTop:"0"}}>Nama</Title>
      <Card
        type="inner"
        title="Inner Card title"
        extra={<a href="#">More</a>}
      >
        Inner Card content
      </Card>
      <Card
        style={{
          marginTop: 16,
        }}
        type="inner"
        title="Inner Card title"
        extra={<a href="#">More</a>}
      >
        Inner Card content
      </Card>
    </>
  );
};

export default TaskDetail;
