import React, { useState } from "react";
import {
  Table,
  Button,
  Tag,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";

const { Option } = Select;
const { Text } = Typography;

const dummyUsers = [
  {
    id: 1,
    name: "Ardit Gashi",
    email: "ardit@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Blerta Morina",
    email: "blerta@example.com",
    role: "staff",
    status: "blocked",
  },
  {
    id: 3,
    name: "Lirim Zeka",
    email: "lirim@example.com",
    role: "staff",
    status: "active",
  },
];

const AccountUserControl = () => {
  const [users, setUsers] = useState(dummyUsers);

  const changeRole = (id, role) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role } : user))
    );
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "active" ? "blocked" : "active" }
          : user
      )
    );
  };

  const deleteUser = (id) => {
    Modal.confirm({
      title: "Jeni i sigurt që dëshironi ta fshini përdoruesin?",
      okText: "Po, Fshij",
      cancelText: "Anulo",
      onOk: () => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        Modal.success({ content: "Përdoruesi u fshi me sukses!" });
      },
    });
  };

  const columns = [
    {
      title: "Emri",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Roli",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <Select
          value={record.role}
          onChange={(val) => changeRole(record.id, val)}
          style={{ width: 110 }}
        >
          <Option value="admin">Admin</Option>
          <Option value="staff">User</Option>
        </Select>
      ),
    },
    {
      title: "Statusi",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Tag color={record.status === "active" ? "green" : "red"}>
          {record.status === "active" ? "Aktiv" : "Bllokuar"}
        </Tag>
      ),
    },
    {
      title: "Veprime",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => toggleStatus(record.id)}>
            {record.status === "active" ? "Blloko" : "Aktivo"}
          </Button>
          <Button danger onClick={() => deleteUser(record.id)}>
            Fshij
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table columns={columns} dataSource={users} rowKey="id" />
    </div>
  );
};

export default AccountUserControl;
