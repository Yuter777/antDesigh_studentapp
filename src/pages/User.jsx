import React from "react";
import { Card, Form, Input, Button } from "antd";

const User = () => {
  return (
    <Card
      title="User Profile"
      style={{ maxWidth: 600, margin: "auto", marginTop: 50 }}
    >
      <Form layout="vertical">
        <Form.Item label="Username">
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item label="Email">
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default User;
