import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Form,
  Input,
  Button,
  Modal,
  Space,
  Typography,
  message,
  Popconfirm,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [form] = Form.useForm();
  const [editingBlog, setEditingBlog] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

 
  // ✅ Filtrimi i blogeve
  const filteredBlogs = blogs.filter(
    (blog) =>
      (blog.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Kolonat e tabelës
  const columns = [
    {
      title: "Titulli",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Përshkrimi",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text) => text?.substring(0, 100) + (text?.length > 100 ? "..." : ""),
    },
    {
      title: "Foto",
      dataIndex: "photoUrl",
      key: "photoUrl",
      render: (url) => (
        <img
          src={url}
          alt="blog"
          style={{ width: 100, height: 60, objectFit: "cover", borderRadius: 6 }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/100x60?text=No+Image";
          }}
        />
      ),
    },
    {
      title: "Data",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("sq-AL"),
    },
    {
      title: "Veprime",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edito
          </Button>
          <Popconfirm
            title="Jeni i sigurt që dëshironi të fshini këtë blog?"
            onConfirm={() => handleDelete(record.blogId)}
            okText="Po"
            cancelText="Jo"
          >
            <Button danger icon={<DeleteOutlined />}>
              Fshij
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 16,
          boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            Menaxhimi i Blogut
          </Title>

          <Space>
            <Input
              placeholder="Kërko në bloge..."
              prefix={<SearchOutlined />}
              allowClear
              style={{ width: 250 }}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                form.resetFields();
                setEditingBlog(null);
                setPhotoUrl("");
                setModalVisible(true);
              }}
            >
              Shto Blog
            </Button>
          </Space>
        </div>
      </Card>

      <Table
        columns={columns}
        dataSource={filteredBlogs}
        rowKey="blogId"
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
        loading={loading}
        style={{ borderRadius: 12, overflowX: "auto" }}
        locale={{
          emptyText: "Nuk ka bloge për të shfaqur",
        }}
      />

      <Modal
        title={editingBlog ? "Edito Blogun" : "Shto Blog"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingBlog(null);
          setPhotoUrl("");
        }}
        footer={null}
        destroyOnClose
        width={600}
      >
        <Form layout="vertical" form={form} onFinish={handleAddOrEdit}>
          <Form.Item
            label="Titulli"
            name="Title"
            rules={[{ required: true, message: "Ju lutem shkruani titullin" }]}
          >
            <Input placeholder="Titulli i blogut" />
          </Form.Item>

          <Form.Item label="Foto" required>
            <Upload
              accept="image/*"
              customRequest={handleUpload}
              showUploadList={false}
              disabled={uploading}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error("Mund të ngarkoni vetëm imazhe!");
                }
                return isImage || Upload.LIST_IGNORE;
              }}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                {uploading ? "Ngarko..." : "Ngarko Foto"}
              </Button>
            </Upload>

            {photoUrl && (
              <div style={{ marginTop: 12 }}>
                <img
                  src={photoUrl}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 200,
                    borderRadius: 6,
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </Form.Item>

          <Form.Item
            label="Përshkrimi"
            name="Description"
            rules={[{ required: true, message: "Ju lutem shkruani përshkrimin" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Përshkrimi i blogut..."
              showCount
              maxLength={1000}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {editingBlog ? "Përditëso" : "Shto"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogManager;
