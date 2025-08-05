import React, { useState } from 'react';
import {
  Card,
  Table,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Space,
  Popconfirm
} from 'antd';

const { Title } = Typography;
const { Option } = Select;

const SupplyInventoryDashboard = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Sistem Frenimi' },
    { id: 2, name: 'Motor' },
    { id: 3, name: 'Transmisioni' }
  ]);

  const [manufacturers, setManufacturers] = useState([
    { id: 1, name: 'Bosch', country: 'Gjermani' },
    { id: 2, name: 'Brembo', country: 'Itali' },
    { id: 3, name: 'Valeo', country: 'Francë' }
  ]);

  const [parts, setParts] = useState([
    {
      id: 1,
      partNumber: 'BP-1001',
      name: 'Frena Disk',
      categoryId: 1,
      manufacturerId: 1,
      price: 45.99,
      stock: 25
    }
  ]);

  const [isPartModalVisible, setIsPartModalVisible] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [form] = Form.useForm();

  const categoryColumns = [
    { title: 'Emri', dataIndex: 'name', key: 'name' }
  ];

  const manufacturerColumns = [
    { title: 'Emri', dataIndex: 'name', key: 'name' },
    { title: 'Vendi', dataIndex: 'country', key: 'country' }
  ];

  const partColumns = [
    { title: 'Numri', dataIndex: 'partNumber', key: 'partNumber' },
    { title: 'Emri', dataIndex: 'name', key: 'name' },
    {
      title: 'Kategoria',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (catId) => categories.find(c => c.id === catId)?.name || 'Pa Kategori'
    },
    {
      title: 'Prodhuesi',
      dataIndex: 'manufacturerId',
      key: 'manufacturerId',
      render: (manId) => manufacturers.find(m => m.id === manId)?.name || 'Pa Prodhues'
    },
    { title: 'Çmimi (€)', dataIndex: 'price', key: 'price' },
    { title: 'Stoku', dataIndex: 'stock', key: 'stock' },
    {
      title: 'Veprime',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setEditingPart(record);
              form.setFieldsValue({
                ...record,
                categoryId: record.categoryId.toString(),
                manufacturerId: record.manufacturerId?.toString()
              });
              setIsPartModalVisible(true);
            }}
          >
            Edito
          </Button>
          <Popconfirm
            title="Jeni i sigurt?"
            onConfirm={() => {
              setParts(parts.filter(p => p.id !== record.id));
              message.success('Pjesa u fshi!');
            }}
          >
            <Button danger>Fshi</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const handleAddPart = (values) => {
    const newPart = {
      ...values,
      id: parts.length > 0 ? Math.max(...parts.map(p => p.id)) + 1 : 1,
      categoryId: Number(values.categoryId),
      manufacturerId: values.manufacturerId ? Number(values.manufacturerId) : null
    };
    setParts([...parts, newPart]);
    message.success('Pjesa u shtua me sukses!');
    setIsPartModalVisible(false);
    form.resetFields();
  };

  const handleEditPart = (values) => {
    setParts(parts.map(p => (p.id === editingPart.id ? { 
      ...editingPart, 
      ...values, 
      categoryId: Number(values.categoryId),
      manufacturerId: values.manufacturerId ? Number(values.manufacturerId) : null
    } : p)));
    message.success('Pjesa u përditësua!');
    setIsPartModalVisible(false);
    setEditingPart(null);
    form.resetFields();
  };

  return (
    <div>
      <Title level={2}>Paneli i Inventarit dhe Furnitorëve</Title>

      <Card title="Kategoriat" style={{ marginBottom: 20 }}>
        <Table
          dataSource={categories}
          columns={categoryColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Card title="Prodhuesit" style={{ marginBottom: 20 }}>
        <Table
          dataSource={manufacturers}
          columns={manufacturerColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Card
        title="Pjesët"
        extra={
          <Button
            type="primary"
            onClick={() => {
              setEditingPart(null);
              form.resetFields();
              setIsPartModalVisible(true);
            }}
          >
            Shto Pjesë
          </Button>
        }
      >
        <Table
          dataSource={parts}
          columns={partColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title={editingPart ? 'Edito Pjesë' : 'Shto Pjesë'}
        visible={isPartModalVisible}
        onCancel={() => {
          setIsPartModalVisible(false);
          setEditingPart(null);
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            if (editingPart) {
              handleEditPart(values);
            } else {
              handleAddPart(values);
            }
          }}
        >
          <Form.Item
            name="partNumber"
            label="Numri i Pjesës"
            rules={[{ required: true, message: 'Ju lutem shkruani numrin e pjesës!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="name"
            label="Emri i Pjesës"
            rules={[{ required: true, message: 'Ju lutem shkruani emrin e pjesës!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Kategoria"
            rules={[{ required: true, message: 'Ju lutem zgjidhni kategorinë!' }]}
          >
            <Select>
              {categories.map(c => (
                <Option key={c.id} value={c.id.toString()}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="manufacturerId"
            label="Prodhuesi"
          >
            <Select allowClear>
              {manufacturers.map(m => (
                <Option key={m.id} value={m.id.toString()}>
                  {m.name} ({m.country})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Çmimi (€)"
            rules={[{ required: true, message: 'Ju lutem shkruani çmimin!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Sasia në stok"
            rules={[{ required: true, message: 'Ju lutem shkruani sasinë!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingPart ? 'Ruaj Ndryshimet' : 'Shto Pjesë'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SupplyInventoryDashboard;