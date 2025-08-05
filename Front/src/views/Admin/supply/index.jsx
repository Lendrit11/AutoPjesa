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
  message
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
    { id: 1, name: 'Bosch', country: 'Gjermani', yearFounded: 1886 },
    { id: 2, name: 'Valeo', country: 'Francë', yearFounded: 1923 }
  ]);

  const [parts, setParts] = useState([
    {
      id: 1,
      partNumber: 'BP-1001',
      name: 'Frena Disk',
      categoryId: 1,
      price: 45.99,
      stock: 25
    }
  ]);

  const [isPartModalVisible, setIsPartModalVisible] = useState(false);
  const [form] = Form.useForm();

  const categoryColumns = [
    { title: 'Emri', dataIndex: 'name', key: 'name' }
  ];

  const manufacturerColumns = [
    { title: 'Emri', dataIndex: 'name', key: 'name' },
    { title: 'Shteti', dataIndex: 'country', key: 'country' },
    { title: 'Viti', dataIndex: 'yearFounded', key: 'yearFounded' }
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
    { title: 'Çmimi (€)', dataIndex: 'price', key: 'price' },
    { title: 'Stoku', dataIndex: 'stock', key: 'stock' }
  ];

  const handleAddPart = (values) => {
    const newPart = {
      ...values,
      id: parts.length > 0 ? Math.max(...parts.map(p => p.id)) + 1 : 1,
      categoryId: Number(values.categoryId)
    };
    setParts([...parts, newPart]);
    message.success('Pjesa u shtua me sukses!');
    setIsPartModalVisible(false);
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
          <Button type="primary" onClick={() => setIsPartModalVisible(true)}>
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
        title="Shto Pjesë"
        visible={isPartModalVisible}
        onCancel={() => setIsPartModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddPart}>
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
              Shto Pjesë
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SupplyInventoryDashboard;
