import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Modal } from "antd";

const ModalComponent = ({
  isModalOpen,
  handleCancel,
  handleOk,
  selectedWorker,
}) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          initialValue={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nama"
            name="name"
            initialValue={selectedWorker.name}
          >
            <Input placeholder={selectedWorker.name}/>
          </Form.Item>

          <Form.Item
            label="Umur"
            name="age"
            initialValue={selectedWorker.age}
          >
            <InputNumber placeholder={selectedWorker.age} />
          </Form.Item>

          <Form.Item
            label="Alamat"
            name="address"
            initialValue={selectedWorker.address}
          >
            <Input placeholder={selectedWorker.address} />
          </Form.Item>

          <Form.Item
            label="Jenis Kelamin"
            name="gender"
            initialValue={selectedWorker.gender}
          >
            <Input placeholder={selectedWorker.gender} />
          </Form.Item>

          <Form.Item
            label="No. Telepon"
            name="phone"
            initialValue={selectedWorker.phone}
          >
            <Input placeholder={selectedWorker.phone} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            initialValue={selectedWorker.email}
          >
            <Input placeholder={selectedWorker.email} />
          </Form.Item>

          <Form.Item
            label="Devisi"
            name="devision"
            initialValue={selectedWorker.devision}
          >
            <Input placeholder={selectedWorker.devision} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 20 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalComponent;
