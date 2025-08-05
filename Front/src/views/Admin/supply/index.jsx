import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Statistic,
  Row,
  Col,
  Popconfirm,
  message,
  Tabs,
  Space,
  Typography,
  Divider,
  Upload,
  Alert,
  Grid
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  UploadOutlined
} from '@ant-design/icons';

const { useBreakpoint } = Grid;
const { TabPane } = Tabs;
const { Option } = Select;
const { Title, Text } = Typography;

const SupplyInventoryDashboard = () => {
  const screens = useBreakpoint();

  // MOCK DATA
  const [categories, setCategories] = useState([
    { id: 1, name: 'Sistem Frenimi' },
    { id: 2, name: 'Motor' },
    { id: 3, name: 'Transmisioni' }
  ]);

  const [manufacturers, setManufacturers] = useState([
    { id: 1, name: 'Bosch', country: 'Gjermani', yearFounded: 1886 },
    { id: 2, name: 'Valeo', country: 'Francë', yearFounded: 1923 }
  ]);

  const [carModels, setCarModels] = useState([
    { id: 1, name: 'Golf VII', manufacturerId: 1, productionYear: 2012 },
    { id: 2, name: 'Passat B8', manufacturerId: 1, productionYear: 2014 }
  ]);

  const [parts, setParts] = useState([
    {
      id: 1,
      partNumber: 'BP-1001',
      name: 'Frena Disk',
      categoryId: 1,
      price: 45.99,
      stock: 25,
      reorderLevel: 10,
      location: 'A1-12',
      compatibleModelIds: [1, 2],
      imageUrls: []
    }
  ]);

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'AutoParts Shpk',
      contactPerson: 'Filan Fisteku',
      phone: '+38344123456',
      email: 'info@autoparts.com',
      status: 'Aktiv',
      manufacturerIds: [1]
    }
  ]);

  const [stockMovements, setStockMovements] = useState([]);

  // MODALS STATE
  const [isPartModalVisible, setIsPartModalVisible] = useState(false);
  const [isSupplierModalVisible, setIsSupplierModalVisible] = useState(false);
  const [isManufacturerModalVisible, setIsManufacturerModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [editingManufacturer, setEditingManufacturer] = useState(null);
  const [activeTab, setActiveTab] = useState('inventory');
  const [activeSupplierTab, setActiveSupplierTab] = useState('1');
  const [form] = Form.useForm();

  // PART FUNCTIONS
  const handleAddPart = (values) => {
    const newPart = {
      ...values,
      id: parts.length > 0 ? Math.max(...parts.map(p => p.id)) + 1 : 1,
    };
    setParts([...parts, newPart]);
    message.success('Pjesa u shtua me sukses!');
    setIsPartModalVisible(false);
  };

  const handleEditPart = (values) => {
    setParts(parts.map(p => p.id === values.id ? values : p));
    message.success('Pjesa u përditësua!');
    setIsPartModalVisible(false);
  };

  const handleDeletePart = (id) => {
    setParts(parts.filter(p => p.id !== id));
    message.success('Pjesa u fshi!');
  };

  // MANUFACTURER FUNCTIONS
  const handleAddManufacturer = (values) => {
    const newManufacturer = {
      ...values,
      id: manufacturers.length > 0 ? Math.max(...manufacturers.map(m => m.id)) + 1 : 1,
    };
    setManufacturers([...manufacturers, newManufacturer]);
    message.success('Prodhuesi u shtua!');
    setIsManufacturerModalVisible(false);
  };

  // CATEGORY FUNCTIONS
  const handleAddCategory = (values) => {
    const newCategory = {
      ...values,
      id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
    };
    setCategories([...categories, newCategory]);
    message.success('Kategoria u shtua!');
    setIsCategoryModalVisible(false);
  };

  // TABLE COLUMNS
  const partColumns = [
    {
      title: 'Numri',
      dataIndex: 'partNumber',
      key: 'partNumber',
      responsive: ['md']
    },
    {
      title: 'Emri',
      dataIndex: 'name',
      key: 'name',
      responsive: ['sm']
    },
    {
      title: 'Kategoria',
      key: 'category',
      dataIndex: 'categoryId',
      filters: categories.map(category => ({
        text: category.name,
        value: category.id,
      })),
      onFilter: (value, record) => {
        const categoryId = typeof value === 'number' ? value : Number(value);
        return record.categoryId === categoryId;
      },
      render: (value) => categories.find(c => c.id === value)?.name,
      responsive: ['md']
    },
    {
      title: 'Çmimi (€)',
      dataIndex: 'price',
      key: 'price',
      responsive: ['lg']
    },
    {
      title: 'Stoku',
      dataIndex: 'stock',
      key: 'stock',
      render: (value, record) => (
        <Text style={{ color: value <= record.reorderLevel ? 'red' : undefined }}>
          {value}
        </Text>
      ),
      responsive: ['sm']
    },
    {
      title: 'Veprime',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            size={screens.xs ? 'small' : 'middle'}
            onClick={() => {
              setEditingPart(record);
              form.setFieldsValue({
                ...record,
                categoryId: record.categoryId.toString()
              });
              setIsPartModalVisible(true);
            }}
          >
            {screens.xs ? '✏️' : 'Edito'}
          </Button>
          <Popconfirm
            title="Jeni i sigurt?"
            onConfirm={() => handleDeletePart(record.id)}
          >
            <Button danger size={screens.xs ? 'small' : 'middle'}>
              {screens.xs ? '🗑️' : 'Fshi'}
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const manufacturerColumns = [
    { title: 'Emri', dataIndex: 'name', key: 'name' },
    {
      title: 'Shteti',
      dataIndex: 'country',
      key: 'country',
      responsive: ['md']
    },
    {
      title: 'Viti',
      dataIndex: 'yearFounded',
      key: 'year',
      responsive: ['lg']
    },
    {
      title: 'Veprime',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            size={screens.xs ? 'small' : 'middle'}
            onClick={() => {
              setEditingManufacturer(record);
              setIsManufacturerModalVisible(true);
            }}
          >
            {screens.xs ? '✏️' : 'Edito'}
          </Button>
          <Button
            danger
            size={screens.xs ? 'small' : 'middle'}
            onClick={() => {
              setManufacturers(manufacturers.filter(m => m.id !== record.id));
              message.success('Prodhuesi u fshi!');
            }}
          >
            {screens.xs ? '🗑️' : 'Fshi'}
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: screens.xs ? 12 : 24 }}>
      <Title level={2} style={{ fontSize: screens.xs ? '20px' : '24px' }}>
        Paneli i Inventarit dhe Furnitorëve
      </Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Total Pjesë" value={parts.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Pjesë Në Alarm"
              value={parts.filter(p => p.stock <= p.reorderLevel).length}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Total Furnitorë" value={suppliers.length} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Vlera Totale"
              value={parts.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}
              prefix="€"
            />
          </Card>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Inventari" key="inventory">
          <Card
            title="Menaxhimi i Pjesëve"
            extra={
              <Space>
                <Input
                  placeholder="Kërko..."
                  prefix={<SearchOutlined />}
                  size={screens.xs ? 'small' : 'middle'}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size={screens.xs ? 'small' : 'middle'}
                  onClick={() => {
                    setEditingPart(null);
                    setIsPartModalVisible(true);
                  }}
                >
                  {screens.xs ? 'Shto' : 'Shto Pjesë'}
                </Button>
              </Space>
            }
          >
            {parts.filter(p => p.stock <= p.reorderLevel).length > 0 && (
              <Alert
                type="warning"
                message={`${parts.filter(p => p.stock <= p.reorderLevel).length} pjesë në stok kritik`}
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            <Table
              columns={partColumns}
              dataSource={parts}
              rowKey="id"
              scroll={{ x: true }}
              size={screens.xs ? 'small' : 'middle'}
            />
          </Card>
        </TabPane>

        <TabPane tab="Furnitorët" key="suppliers">
          <Card
            title="Lista e Furnitorëve"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size={screens.xs ? 'small' : 'middle'}
                onClick={() => setIsSupplierModalVisible(true)}
              >
                {screens.xs ? 'Shto' : 'Shto Furnitor'}
              </Button>
            }
          >
            <Table
              dataSource={suppliers}
              rowKey="id"
              size={screens.xs ? 'small' : 'middle'}
              pagination={{ pageSize: 5 }}
              columns={[
                { title: 'Emri', dataIndex: 'name', key: 'name' },
                { title: 'Personi Kontaktues', dataIndex: 'contactPerson', key: 'contactPerson' },
                { title: 'Telefoni', dataIndex: 'phone', key: 'phone' },
                { title: 'Email', dataIndex: 'email', key: 'email' },
                {
                  title: 'Statusi',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status) => (
                    <Tag color={status === 'Aktiv' ? 'green' : 'red'}>
                      {status}
                    </Tag>
                  )
                }
              ]}
            />
          </Card>
        </TabPane>

        <TabPane tab="Prodhuesit" key="manufacturers">
          <Card
            title="Lista e Prodhuesve"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size={screens.xs ? 'small' : 'middle'}
                onClick={() => setIsManufacturerModalVisible(true)}
              >
                {screens.xs ? 'Shto' : 'Shto Prodhues'}
              </Button>
            }
          >
            <Table
              columns={manufacturerColumns}
              dataSource={manufacturers}
              rowKey="id"
              size={screens.xs ? 'small' : 'middle'}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Kategoriat" key="categories">
          <Card
            title="Lista e Kategorive"
            extra={
              <Button
                type="primary"
                size={screens.xs ? 'small' : 'middle'}
                onClick={() => setIsCategoryModalVisible(true)}
              >
                {screens.xs ? 'Shto' : 'Shto Kategori'}
              </Button>
            }
          >
            <Table
              dataSource={categories}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              columns={[
                { title: 'Emri', dataIndex: 'name', key: 'name' },
                {
                  title: 'Veprime',
                  key: 'actions',
                  render: (_, record) => (
                    <Popconfirm
                      title="Jeni i sigurt që dëshironi të fshini?"
                      onConfirm={() => {
                        setCategories(categories.filter(c => c.id !== record.id));
                        message.success('Kategoria u fshi!');
                      }}
                    >
                      <Button danger size={screens.xs ? 'small' : 'middle'}>
                        {screens.xs ? '🗑️' : 'Fshi'}
                      </Button>
                    </Popconfirm>
                  )
                }
              ]}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Part Modal */}
      <Modal
        title={editingPart ? 'Edito Pjesë' : 'Shto Pjesë'}
        visible={isPartModalVisible}
        onCancel={() => setIsPartModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            categoryId: categories.length > 0 ? categories[0].id.toString() : undefined,
            stock: 0,
            reorderLevel: 10,
            compatibleModelIds: []
          }}
          onFinish={(values) => {
            if (editingPart) {
              handleEditPart({ ...editingPart, ...values, categoryId: Number(values.categoryId) });
            } else {
              handleAddPart({ ...values, categoryId: Number(values.categoryId) });
            }
            form.resetFields();
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

          <Form.Item
            name="reorderLevel"
            label="Nivel i alarmin për rimbushje"
            rules={[{ required: true, message: 'Ju lutem shkruani nivelin!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="location"
            label="Vendndodhja në depo"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="compatibleModelIds"
            label="Modelët e makinave të përshtatshme"
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Zgjidh modelët"
            >
              {carModels.map(model => (
                <Option key={model.id} value={model.id}>
                  {model.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingPart ? 'Ruaj Ndryshimet' : 'Shto Pjesë'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Supplier Modal (empty template, mund ta plotësosh sipas nevojës) */}
      <Modal
        title="Shto Furnitor"
        visible={isSupplierModalVisible}
        onCancel={() => setIsSupplierModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Alert message="Modal për shtimin/editimin e furnitorëve do implementohet." type="info" />
      </Modal>

      {/* Manufacturer Modal */}
      <Modal
        title={editingManufacturer ? 'Edito Prodhues' : 'Shto Prodhues'}
        visible={isManufacturerModalVisible}
        onCancel={() => setIsManufacturerModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          layout="vertical"
          initialValues={editingManufacturer || { yearFounded: 2000 }}
          onFinish={(values) => {
            if (editingManufacturer) {
              setManufacturers(manufacturers.map(m => m.id === editingManufacturer.id ? { ...editingManufacturer, ...values } : m));
              message.success('Prodhuesi u përditësua!');
            } else {
              handleAddManufacturer(values);
            }
            setIsManufacturerModalVisible(false);
            setEditingManufacturer(null);
          }}
        >
          <Form.Item
            name="name"
            label="Emri"
            rules={[{ required: true, message: 'Ju lutem shkruani emrin!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="country"
            label="Shteti"
            rules={[{ required: true, message: 'Ju lutem shkruani shtetin!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="yearFounded"
            label="Viti i themelimit"
            rules={[{ required: true, message: 'Ju lutem shkruani vitin!' }]}
          >
            <InputNumber min={1800} max={new Date().getFullYear()} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingManufacturer ? 'Ruaj Ndryshimet' : 'Shto Prodhues'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Category Modal */}
      <Modal
        title="Shto Kategori"
        visible={isCategoryModalVisible}
        onCancel={() => setIsCategoryModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            handleAddCategory(values);
          }}
        >
          <Form.Item
            name="name"
            label="Emri i kategorisë"
            rules={[{ required: true, message: 'Ju lutem shkruani emrin e kategorisë!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Shto Kategori
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SupplyInventoryDashboard;