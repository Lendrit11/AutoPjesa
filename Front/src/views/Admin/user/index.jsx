import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Typography,
} from "antd";

const { Option } = Select;
const { Title, Text } = Typography;

const dummyUsers = [
  { id: 1, name: "Ardit Gashi", email: "ardit@example.com", role: "admin", status: "active" },
  { id: 2, name: "Blerta Morina", email: "blerta@example.com", role: "staff", status: "blocked" },
  { id: 3, name: "Lirim Zeka", email: "lirim@example.com", role: "staff", status: "active" },
];

const AccountUserControl = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const changeRole = (id, role) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, role } : user)));
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

  const handleEditProfile = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Modal.success({ content: "Profili u përditësua me sukses!" });
    }, 2000);
  };

  const columns = [
    {
      title: "Emri",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
      render: (text) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Roli",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Admin", value: "admin" },
        { text: "User", value: "staff" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (_, record) => (
        <Select
          value={record.role}
          onChange={(val) => changeRole(record.id, val)}
          bordered={false}
          style={{ width: 110 }}
          popupMatchSelectWidth={false}
          dropdownStyle={{
            borderRadius: 12,
            boxShadow: "0 8px 16px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)",
          }}
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
      filters: [
        { text: "Aktiv", value: "active" },
        { text: "Bllokuar", value: "blocked" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, record) => (
        <Tag
          color={record.status === "active" ? "#52c41a" : "#ff4d4f"}
          style={{
            fontWeight: 600,
            borderRadius: 20,
            padding: "0 14px",
            fontSize: 13,
            textTransform: "uppercase",
            boxShadow: record.status === "active" ? "0 0 8px #b7eb8f" : "0 0 8px #ffa39e",
          }}
        >
          {record.status === "active" ? "Aktiv" : "Bllokuar"}
        </Tag>
      ),
    },
    {
      title: "Veprime",
      key: "actions",
      render: (_, record) => (
        <Space wrap>
          <Button
            type={record.status === "active" ? "default" : "primary"}
            danger={record.status === "active"}
            onClick={() => toggleStatus(record.id)}
            className="animated-button"
          >
            {record.status === "active" ? "Blloko" : "Aktivo"}
          </Button>
          <Button
            danger
            onClick={() => deleteUser(record.id)}
            className="animated-button danger"
          >
            Fshij
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "24px",
        fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Profili */}
      <Card
        style={{
          maxWidth: 920,
          margin: "0 auto 24px",
          borderRadius: 24,
          boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
          backgroundColor: "#fff",
          padding: "16px",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: "0 16px 24px" }}>
          <Title level={2} style={{ color: "#111", marginBottom: 12, fontSize: "clamp(20px, 4vw, 28px)" }}>
            Profili i Administratorit
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleEditProfile}
            initialValues={{ name: "Admini Kryesor", email: "admin@example.com" }}
            size="large"
          >
            <Form.Item
              label="Emri"
              name="name"
              rules={[{ required: true, message: "Ju lutem shkruani emrin!" }]}
              style={{ marginBottom: 24 }}
            >
              <Input placeholder="Shkruani emrin" style={{ borderRadius: 12, border: "none" }} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { type: "email", message: "Email i pavlefshëm!" },
                { required: true, message: "Email është i detyrueshëm!" },
              ]}
              style={{ marginBottom: 24 }}
            >
              <Input placeholder="shembull@example.com" style={{ borderRadius: 12, border: "none" }} />
            </Form.Item>
            <Form.Item label="Fjalëkalimi i Ri" name="password" style={{ marginBottom: 32 }}>
              <Input.Password placeholder="(Opsionale)" style={{ borderRadius: 12, border: "none" }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading} className="submit-button">
                Përditëso Profilin
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>

      {/* Menaxhimi i përdoruesve */}
      <Card
        style={{
          maxWidth: 920,
          margin: "0 auto",
          borderRadius: 24,
          boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
          backgroundColor: "#fff",
          padding: "16px",
        }}
        bodyStyle={{ padding: 0 }}
        title={
          <Title level={3} style={{ margin: 0, fontWeight: 700, fontSize: "clamp(18px, 3vw, 24px)" }}>
            Menaxhimi i Përdoruesve
          </Title>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          rowClassName="animated-row"
          style={{ padding: "0 12px 12px" }}
          scroll={{ x: "max-content" }} // për telefon / tableta
        />
      </Card>

      {/* Styles */}
      <style>{`
        .animated-button {
          transition: box-shadow 0.3s ease, transform 0.2s ease;
          border-radius: 12px;
          font-weight: 600;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .animated-button:hover {
          box-shadow: 0 0 12px #40a9ff;
          transform: translateY(-3px);
        }
        .animated-button.danger:hover {
          box-shadow: 0 0 12px #ff4d4f;
          transform: translateY(-3px);
        }
        .animated-row:hover {
          background: #e6f7ff;
          transform: translateY(-4px);
          transition: background 0.3s ease, transform 0.3s ease;
          box-shadow: 0 8px 20px rgba(24,144,255,0.2);
          border-radius: 12px;
        }
        @media (max-width: 768px) {
          .ant-card {
            margin: 12px;
          }
          .ant-space {
            display: flex;
            flex-wrap: wrap;
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AccountUserControl;
