import React from "react";
import { Card, Typography, Tag } from "antd";
import { useLocation } from "react-router-dom";
const { Title } = Typography;

const TaskDetail = () => {
  const location = useLocation();
  const data = location.state
  return (
    <>
      <Title level={2} style={{ textAlign: "left", paddingTop: "0" }}>
        {data.name}
      </Title>
      {data.tasks.map((item, index) => (
      <Card
        key={index}
        type="inner"
        title={item.description}
        extra={item.isDone == true ? <Tag color="green">Selesai</Tag> : <Tag color="red">Belum Selesai</Tag>}
      >
        {item.content}
      </Card>
    ))}
    {/* <button onClick={() => console.log(data)}>s</button> */}
    </>
  );
};

export default TaskDetail;
