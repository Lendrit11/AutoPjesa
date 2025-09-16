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

// ✅ Funksion për të marrë token nga cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// ✅ Konfigurim global për axios
const api = axios.create({
  baseURL: "http://localhost:5298",
  withCredentials: true,
});

// ✅ Interceptor për të shtuar token në header
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor për gabimet
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      message.error("Session ka skaduar. Ju lutem kyçuni përsëri.");
      window.location.href = "/admin/login";
    } else if (error.response?.status === 403) {
      message.error("Nuk keni të drejta për këtë veprim.");
    }
    return Promise.reject(error);
  }
);

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

  // ✅ Kontrollo token dhe bëj redirect nëse mungon
  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // ✅ Merr bloget
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/Blog");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      if (error.response?.status !== 401) {
        message.error("Gabim gjatë marrjes së blogeve");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Upload foto
  const handleUpload = async ({ file }) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    setUploading(true);
    try {
      const response = await api.post("/api/Blog/upload-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPhotoUrl(response.data.url);
      message.success("Foto u ngarkua me sukses");
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Gabim gjatë ngarkimit të fotos");
    } finally {
      setUploading(false);
    }

    return false;
  };

  // ✅ Shto ose edito blog
  const handleAddOrEdit = async (values) => {
    if (!photoUrl && !editingBlog?.photoUrl) {
      message.error("Ju lutem ngarkoni një foto për blogun");
      return;
    }

    const payload = {
      Title: values.Title,
      Description: values.Description,
      PhotoUrl: photoUrl || editingBlog?.photoUrl,
    };

    try {
      if (editingBlog) {
        await api.put(`/api/Blog/${editingBlog.blogId}`, payload);
        message.success("Blogu u përditësua me sukses");
      } else {
        await api.post("/api/Blog", payload);
        message.success("Blogu u shtua me sukses");
      }

      form.resetFields();
      setPhotoUrl("");
      setEditingBlog(null);
      setModalVisible(false);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      message.error(error.response?.data?.message || "Gabim gjatë ruajtjes së blogut");
    }
  };

  // ✅ Fshij blog
  const handleDelete = async (blogId) => {
    try {
      await api.delete(`/api/Blog/${blogId}`);
      message.success("Blogu u fshi me sukses");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      message.error(error.response?.data?.message || "Gabim gjatë fshirjes së blogut");
    }
  };

  // ✅ Edito blog
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    form.setFieldsValue({
      Title: blog.title,
      Description: blog.description,
    });
    setPhotoUrl(blog.photoUrl || "");
    setModalVisible(true);
  };

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


