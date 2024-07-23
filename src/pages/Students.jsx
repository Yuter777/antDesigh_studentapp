import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm } from "antd";
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:3000/students");
    setStudents(response.data);
  };

  const handleAdd = () => {
    setIsModalVisible(true);
    setEditingStudent(null);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setIsModalVisible(true);
    setEditingStudent(record);
    form.setFieldsValue(record);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/students/${id}`);
    fetchStudents();
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editingStudent) {
      await axios.put(
        `http://localhost:3000/students/${editingStudent.id}`,
        values
      );
    } else {
      await axios.post("http://localhost:3000/students", values);
    }
    fetchStudents();
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastname",
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Student
      </Button>
      <Table
        columns={columns}
        dataSource={students}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={editingStudent ? "Edit Student" : "Add Student"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="group"
            label="Group"
            rules={[{ required: true, message: "Please input the group!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Students;
