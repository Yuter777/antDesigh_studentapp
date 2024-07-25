import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, Select } from "antd";
import axios from "axios";

const { Search } = Input;
const { Option } = Select;

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:3000/students");
    setStudents(response.data);
    setFilteredStudents(response.data);
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

  const handleSearch = (text) => {
    setSearchText(text);
    filterStudents(text, selectedGroup);
  };

  const handleGroupChange = (value) => {
    setSelectedGroup(value);
    filterStudents(searchText, value);
  };

  const filterStudents = (searchText, group) => {
    let filtered = students;
    if (searchText) {
      filtered = filtered.filter(
        (student) =>
          student.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          student.lastName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (group) {
      filtered = filtered.filter((student) => student.group === group);
    }
    setFilteredStudents(filtered);
  };

  const getGroups = () => {
    const groups = [...new Set(students.map((student) => student.group))];
    return groups.map((group) => (
      <Option key={group} value={group}>
        {group}
      </Option>
    ));
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
      <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>
        <Search
          placeholder="Search by name"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Select
          placeholder="Filter by group"
          onChange={handleGroupChange}
          allowClear
        >
          {getGroups()}
        </Select>
        <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
          Add Student
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredStudents}
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
