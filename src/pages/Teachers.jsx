import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, Select } from "antd";
import axios from "axios";

const { Search } = Input;
const { Option } = Select;

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const response = await axios.get("http://localhost:3000/teachers");
    setTeachers(response.data);
    setFilteredTeachers(response.data);
  };

  const handleAdd = () => {
    setIsModalVisible(true);
    setEditingTeacher(null);
    form.resetFields();
  };

  const handleEdit = (record) => {
    setIsModalVisible(true);
    setEditingTeacher(record);
    form.setFieldsValue(record);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/teachers/${id}`);
    fetchTeachers();
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editingTeacher) {
      await axios.put(
        `http://localhost:3000/teachers/${editingTeacher.id}`,
        values
      );
    } else {
      await axios.post("http://localhost:3000/teachers", values);
    }
    fetchTeachers();
    setIsModalVisible(false);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    filterTeachers(text, selectedLevel);
  };

  const handleLevelChange = (value) => {
    setSelectedLevel(value);
    filterTeachers(searchText, value);
  };

  const filterTeachers = (searchText, level) => {
    let filtered = teachers;
    if (searchText) {
      filtered = filtered.filter(
        (teacher) =>
          teacher.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          teacher.lastName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (level) {
      filtered = filtered.filter((teacher) => teacher.level === level);
    }
    setFilteredTeachers(filtered);
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
      title: "Level",
      dataIndex: "level",
      key: "level",
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
      <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
        <Search
          placeholder="Search by name"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Select
          placeholder="Filter by level"
          onChange={handleLevelChange}
          allowClear
        >
          <Option value="Junior">Junior</Option>
          <Option value="Middle">Middle</Option>
          <Option value="Senior">Senior</Option>
        </Select>
        <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
          Add Teacher
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredTeachers}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={editingTeacher ? "Edit Teacher" : "Add Teacher"}
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
            name="level"
            label="Level"
            rules={[{ required: true, message: "Please input the level!" }]}
          >
            <Select>
              <Option value="Junior">Junior</Option>
              <Option value="Middle">Middle</Option>
              <Option value="Senior">Senior</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Teachers;
