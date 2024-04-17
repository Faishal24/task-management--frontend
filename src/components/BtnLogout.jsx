import React from "react";
import { useAuth } from "../hooks/AuthProvider";
import { Button } from "antd";
import LogoutOutlined from  "@ant-design/icons/LogoutOutlined";

const BtnLogout = () => {
  const auth = useAuth();
  return (
    <Button 
        style={{
            width: 100,
            height: 32,
            textAlign: "center",
            marginRight: 20,
        }}
        icon={<LogoutOutlined/>}
        onClick={() => auth.logOut()} 
        danger>
      Logout
    </Button>
  );
};

export default BtnLogout;
