import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BookOutlined,
  DashboardOutlined,
  FolderOpenOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Task from "./Task";
import BtnLogout from "../components/BtnLogout";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Worker from "./Worker";
import TaskDetail from "./TaskDetail";
import Profile from "./Profile";
import Report from "./Report";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../hooks/AuthProvider";
import Setting from "./Setting";

const { Header, Sider, Content } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // JWT check
  const { token, logOut } = useAuth();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            logOut();
          } else {
            setIsAuth(true);
          }
        } catch (error) {
          console.error("Token tidak valid", error);
          logOut();
        }
      } else {
        setIsAuth(false);
      }
    }
    checkToken();
  }, [token, logOut]);
  return (
    <Layout hasSider>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1" disabled>
            <h1>TManagement</h1>
          </Menu.Item>
          <Menu.Item key="2" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FolderOpenOutlined />}>
            <Link to="/tugas">Tugas</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/anggota">Anggota</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<BookOutlined />}>
            <Link to="/laporan">Laporan</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<SettingOutlined />}>
            <Link to="/pengaturan">Pengaturan</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          /> */}
          
          <h2></h2>
          <h2>Task Management</h2>
          <BtnLogout />
          
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 630,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tugas" element={<Task />} />
            <Route path="/anggota" element={<Worker />} />
            <Route path="/detail" element={<TaskDetail />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/laporan" element={<Report />} />
            <Route path="/pengaturan" element={<Setting />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
