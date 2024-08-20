import React, { useState } from "react";
import { Alert, Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, UserOutlined, CloseSquareFilled } from "@ant-design/icons";
import "../style/Login.css"
import { useAuth } from "../hooks/AuthProvider";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

const Login = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
      border: `1px solid ${token.colorBorder}`,
      borderRadius: token.borderRadius,
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      //   backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "80vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  const auth = useAuth();
  const handleSubmit = () => {
    if (input.email !== "" && input.password !== "") {
      auth.loginAction(input)
      auth.message()
      return;
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="outer">
      <section style={styles.section}>
        <div style={styles.container}>
        <Alert 
          message="Nama atau kata sandi yang anda masukkan salah." 
          type="error"
          className="alert"/>
          <div style={styles.header}>
            <Title style={styles.title}>Masuk</Title>
            <Text style={styles.text}>Selamat datang kembali.</Text>
          </div>
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Masukkan nama anda!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                name="email"
                onChange={handleInput}
                // onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Masukkan kata sandi!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Kata Sandi"
                name="password"
                onChange={handleInput}
                // onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ingat saya</Checkbox>
              </Form.Item>
              <a style={styles.forgotPassword} href="">
                Lupa sandi?
              </a>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block="true" type="primary" htmlType="submit">
                Masuk
              </Button>
              <div style={styles.footer}></div>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default Login;
