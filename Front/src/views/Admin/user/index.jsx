import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Table,
  Button,
  Tag,
  Form,
  Input,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const { Title, Text } = Typography;

const getTokenFromCookie = () => {
  const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
  if (match) return decodeURIComponent(match[2]);
  return null;
};

const AccountUserControl = () => {
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
const navigate = useNavigate(); 
  const API_BASE = "http://localhost:5298/api/Users";

  // Merr token-in nga cookie
  const token = getTokenFromCookie();

  // Konfigurimi i axios me token në header Authorization
  const axiosConfig = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  // Funksioni për marrjen e përdoruesve
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_BASE, axiosConfig);
      setUsers(res.data.map((u) => ({ ...u, id: u.id || u.UserId })));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        message.error("Nuk jeni të autorizuar. Ju lutem identifikohuni.");
        // Opsional: ridrejto te login
        // window.location.href = "/login";
      } else {
        message.error("Gabim gjatë marrjes së përdoruesve!");
      }
      console.error(err);
    }
  };

  // Funksioni për marrjen e profilit të adminit
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_BASE}/profile`, axiosConfig);
      form.setFieldsValue({
        name: res.data.name,
        email: res.data.email,
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        message.error("Nuk jeni të autorizuar. Ju lutem identifikohuni.");
        // window.location.href = "/login";
      } else {
        message.error("Gabim gjatë marrjes së profilit!");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) {
  navigate('/admin/login');
  return;
}
    fetchProfile();
    fetchUsers();
  }, [token]);

  const changeRole = async (id, role) => {
    try {
      await axios.put(`${API_BASE}/${id}/role`, { role }, axiosConfig);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role } : u))
      );
      message.success("Roli u ndryshua me sukses!");
    } catch (err) {
      message.error("Gabim gjatë ndryshimit të rolit!");
      console.error(err);
    }
  };

  const toggleStatus = async (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const newStatus = user.status === "active" ? "blocked" : "active";
    try {
      await axios.put(`${API_BASE}/${id}/status`, { status: newStatus }, axiosConfig);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
      );
      message.success("Statusi u ndryshua me sukses!");
    } catch (err) {
      message.error("Gabim gjatë ndryshimit të statusit!");
      console.error(err);
    }
  };

  const deleteUser = async (userId) => {
    if (!userId) {
      message.error("ID e përdoruesit nuk është e vlefshme!");
      return;
    }
    try {
      await axios.delete(`${API_BASE}/${userId}`, axiosConfig);
      message.success("Përdoruesi u fshi me sukses!");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      message.error("Gabim gjatë fshirjes së përdoruesit!");
      console.error(err);
    }
  };

  const handleEditProfile = async (values) => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE}/profile`, values, axiosConfig);
      message.success("Profili u përditësua me sukses!");
      form.setFieldsValue(values);
    } catch (err) {
      message.error("Gabim gjatë përditësimit të profilit!");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
        { text: "User", value: "user" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (_, record) => (
        <Select
          value={record.role}
          onChange={(val) => changeRole(record.id, val)}
          style={{ width: 110 }}
        >
          <Option value="admin">Admin</Option>
          <Option value="user">User</Option>
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
            boxShadow:
              record.status === "active"
                ? "0 0 8px #b7eb8f"
                : "0 0 8px #ffa39e",
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
        fontFamily:
          "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
      >
        <div style={{ padding: "0 16px 24px" }}>
          <Title
            level={2}
            style={{
              color: "#111",
              marginBottom: 12,
              fontSize: "clamp(20px, 4vw, 28px)",
            }}
          >
            Profili i Administratorit
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleEditProfile}
            size="large"
          >
            <Form.Item
              label="Emri"
              name="name"
              rules={[{ required: true, message: "Ju lutem shkruani emrin!" }]}
              style={{ marginBottom: 24 }}
            >
              <Input placeholder="Shkruani emrin" />
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
              <Input placeholder="shembull@example.com" />
            </Form.Item>
            <Form.Item
              label="Fjalëkalimi i Ri"
              name="password"
              style={{ marginBottom: 32 }}
            >
              <Input.Password placeholder="(Opsionale)" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
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
        title={
          <Title
            level={3}
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: "clamp(18px, 3vw, 24px)",
            }}
          >
            Menaxhimi i Përdoruesve
          </Title>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
          rowClassName={() => "animated-row"}
        />
      </Card>

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
