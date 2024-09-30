import React, { useEffect, useState } from "react";
import BtnLogout from "../components/BtnLogout";
import axios from "axios";
import { Flex, Typography, Switch, Space } from "antd";

const Setting = () => {
  const [user, setUser] = useState(null);
  const { Text, Title } = Typography;

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/user/manager/6608fed14eab8bd233a4f872`
        );
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (
    <Space direction="vertical" size="large">
      <Title
        level={2}
        style={{
          textAlign: "Left",
          paddingTop: "0px",
          marginTop: "0px",
          marginBottom: "24px",
        }}
      >
        User: {user?.name || "Loading..."}
      </Title>

      <Space>
        <Text>Theme</Text>
        <Switch
          defaultChecked
          onChange={onChange}
          style={{ maxWidth: "20px" }}
        />
      </Space>
      <BtnLogout />
    </Space>
  );
};

export default Setting;
