import React, { useEffect, useState } from "react";
import BtnLogout from "../components/BtnLogout";
import axios from "axios";
import { Divider, List, Typography } from "antd";

const Setting = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/manager/6608fed14eab8bd233a4f872`
        );
        setUser(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <BtnLogout />
      <p>{user.name}</p>
    </div>
  );
};

export default Setting;
