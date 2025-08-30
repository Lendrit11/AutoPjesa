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
  Grid,
  Image,
  List
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  BuildOutlined,
  AppstoreOutlined,
  ShopOutlined
} from '@ant-design/icons';

const { useBreakpoint } = Grid;
const { TabPane } = Tabs;
const { Option } = Select;
const { Title, Text } = Typography;

const SupplyInventoryDashboard = () => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();

  // MOCK DATA
  const [categories, setCategories] = useState([
    { id: 1, name: 'Sistem Frenimi' },
    { id: 2, name: 'Motor' },
    { id: 3, name: 'Transmisioni' },
    { id: 4, name: 'Sistem Elektrik' },
    { id: 5, name: 'Sistem Shasing' }
  ]);

  const [manufacturers, setManufacturers] = useState([
    { id: 1, name: 'Bosch', country: 'Gjermani', yearFounded: 1886 },
    { id: 2, name: 'Valeo', country: 'Francë', yearFounded: 1923 },
    { id: 3, name: 'Delphi', country: 'SHBA', yearFounded: 1994 },
    { id: 4, name: 'Denso', country: 'Japoni', yearFounded: 1949 }
  ]);

  const [carModels, setCarModels] = useState([
    { id: 1, name: 'Golf VII', manufacturerId: 1, productionYear: 2012 },
    { id: 2, name: 'Passat B8', manufacturerId: 1, productionYear: 2014 },
    { id: 3, name: 'Civic X', manufacturerId: 2, productionYear: 2015 },
    { id: 4, name: 'Corolla XII', manufacturerId: 2, productionYear: 2018 }
  ]);

  const [parts, setParts] = useState([
    {
      id: 1,
      partNumber: 'BP-1001',
      name: 'Frena Disk',
      categoryId: 1,
      price: 45.99,
      stock: 5,
      reorderLevel: 10,
      location: 'A1-12',
      compatibleModelIds: [1, 2],
      imageUrls: []
    },
    {
      id: 2,
      partNumber: 'EN-2005',
      name: 'Filter Ajri',
      categoryId: 2,
      price: 12.50,
      stock: 35,
      reorderLevel: 5,
      location: 'B2-07',
      compatibleModelIds: [1, 3, 4],
      imageUrls: []
    },
    {
      id: 3,
      partNumber: 'TR-3002',
      name: 'Diferencial',
      categoryId: 3,
      price: 245.75,
      stock: 3,
      reorderLevel: 2,
      location: 'C3-15',
      compatibleModelIds: [2, 4],
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
      address: 'Rr. Lidhja e Prizrenit, Prishtinë',
      status: 'Aktiv',
      manufacturerIds: [1, 2]
    },
    {
      id: 2,
      name: 'EuroCar Parts',
      contactPerson: 'Agim Berisha',
      phone: '+38349567890',
      email: 'agim@eurocarparts.com',
      address: 'Rr. Deshmoret e Kombit, Prishtinë',
      status: 'Aktiv',
      manufacturerIds: [1, 3, 4]
    }
  ]);

  const [stockMovements, setStockMovements] = useState([]);

  // MODALS STATE
  const [isPartModalVisible, setIsPartModalVisible] = useState(false);
  const [isSupplierModalVisible, setIsSupplierModalVisible] = useState(false);
  const [isManufacturerModalVisible, setIsManufacturerModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [editingManufacturer, setEditingManufacturer] = useState(null);
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchText, setSearchText] = useState('');

  // PART FUNCTIONS
  const handleAddPart = (values) => {
    const newPart = {
      ...values,
      id: parts.length > 0 ? Math.max(...parts.map(p => p.id)) + 1 : 1,
    };
    setParts([...parts, newPart]);
    message.success('Pjesa u shtua me sukses!');
    setIsPartModalVisible(false);
    form.resetFields();
  };

  const handleEditPart = (values) => {
    setParts(parts.map(p => p.id === editingPart.id ? { ...editingPart, ...values } : p));
    message.success('Pjesa u përditësua!');
    setIsPartModalVisible(false);
    setEditingPart(null);
    form.resetFields();
  };

  const handleDeletePart = (id) => {
    setParts(parts.filter(p => p.id !== id));
    message.success('Pjesa u fshi!');
  };

  // SUPPLIER FUNCTIONS
  const handleAddSupplier = (values) => {
    const newSupplier = {
      ...values,
      id: suppliers.length > 0 ? Math.max(...suppliers.map(s => s.id)) + 1 : 1,
    };
    setSuppliers([...suppliers, newSupplier]);
    message.success('Furnitori u shtua me sukses!');
    setIsSupplierModalVisible(false);
  };

  const handleEditSupplier = (values) => {
    setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? { ...editingSupplier, ...values } : s));
    message.success('Furnitori u përditësua!');
    setIsSupplierModalVisible(false);
    setEditingSupplier(null);
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
    message.success('Furnitori u fshi!');
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

  // FILTER PARTS BASED ON SEARCH
  const filteredParts = parts.filter(part => 
    part.name.toLowerCase().includes(searchText.toLowerCase()) ||
    part.partNumber.toLowerCase().includes(searchText.toLowerCase())
  );

  // TABLE COLUMNS
  const partColumns = [
    {
      title: 'Numri i Pjesës',
      dataIndex: 'partNumber',
      key: 'partNumber',
      responsive: ['md'],
      sorter: (a, b) => a.partNumber.localeCompare(b.partNumber),
    },
    {
      title: 'Emri',
      dataIndex: 'name',
      key: 'name',
      responsive: ['sm'],
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Kategoria',
      key: 'category',
      dataIndex: 'categoryId',
      filters: categories.map(category => ({
        text: category.name,
        value: category.id,
      })),
      onFilter: (value, record) => record.categoryId === value,
      render: (value) => {
        const category = categories.find(c => c.id === value);
        return <Tag color="blue">{category?.name}</Tag>;
      },
      responsive: ['md'],
    },
    {
      title: 'Çmimi (€)',
      dataIndex: 'price',
      key: 'price',
      responsive: ['lg'],
      sorter: (a, b) => a.price - b.price,
      render: (price) => `€${price.toFixed(2)}`
    },
    {
      title: 'Stoku',
      dataIndex: 'stock',
      key: 'stock',
      render: (value, record) => (
        <div>
          <Text style={{ color: value <= record.reorderLevel ? 'red' : 'green', fontWeight: 'bold' }}>
            {value}
          </Text>
          {value <= record.reorderLevel && (
            <div style={{ fontSize: '10px', color: 'red' }}>STOK I ULTË</div>
          )}
        </div>
      ),
      responsive: ['sm'],
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Veprime',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            size={screens.xs ? 'small' : 'middle'}
            icon={<EditOutlined />}
            onClick={() => {
              setEditingPart(record);
              form.setFieldsValue({
                ...record,
                categoryId: record.categoryId.toString()
              });
              setIsPartModalVisible(true);
            }}
          >
            {!screens.xs && 'Edito'}
          </Button>
          <Popconfirm
            title="Jeni i sigurt që dëshironi të fshini këtë pjesë?"
            onConfirm={() => handleDeletePart(record.id)}
            okText="Po"
            cancelText="Jo"
          >
            <Button danger size={screens.xs ? 'small' : 'middle'} icon={<DeleteOutlined />}>
              {!screens.xs && 'Fshi'}
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const manufacturerColumns = [
    { 
      title: 'Emri', 
      dataIndex: 'name', 
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Shteti',
      dataIndex: 'country',
      key: 'country',
      responsive: ['md'],
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: 'Viti i Themelimit',
      dataIndex: 'yearFounded',
      key: 'year',
      responsive: ['lg'],
      sorter: (a, b) => a.yearFounded - b.yearFounded,
    },
    {
      title: 'Veprime',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            size={screens.xs ? 'small' : 'middle'}
            icon={<EditOutlined />}
            onClick={() => {
              setEditingManufacturer(record);
              setIsManufacturerModalVisible(true);
            }}
          >
            {!screens.xs && 'Edito'}
          </Button>
          <Popconfirm
            title="Jeni i sigurt që dëshironi të fshini këtë prodhues?"
            onConfirm={() => {
              setManufacturers(manufacturers.filter(m => m.id !== record.id));
              message.success('Prodhuesi u fshi!');
            }}
            okText="Po"
            cancelText="Jo"
          >
            <Button danger size={screens.xs ? 'small' : 'middle'} icon={<DeleteOutlined />}>
              {!screens.xs && 'Fshi'}
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const supplierColumns = [
    { 
      title: 'Emri', 
      dataIndex: 'name', 
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    { 
      title: 'Personi Kontaktues', 
      dataIndex: 'contactPerson', 
      key: 'contactPerson',
      responsive: ['md'],
    },
    { 
      title: 'Telefoni', 
      dataIndex: 'phone', 
      key: 'phone',
      responsive: ['lg'],
    },
    { 
      title: 'Email', 
      dataIndex: 'email', 
      key: 'email',
      responsive: ['lg'],
    },
    {
      title: 'Statusi',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Aktiv' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Aktiv', value: 'Aktiv' },
        { text: 'Jo Aktiv', value: 'Jo Aktiv' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Veprime',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            size={screens.xs ? 'small' : 'middle'}
            icon={<EditOutlined />}
            onClick={() => {
              setEditingSupplier(record);
              setIsSupplierModalVisible(true);
            }}
          >
            {!screens.xs && 'Edito'}
          </Button>
          <Popconfirm
            title="Jeni i sigurt që dëshironi të fshini këtë furnitor?"
            onConfirm={() => handleDeleteSupplier(record.id)}
            okText="Po"
            cancelText="Jo"
          >
            <Button danger size={screens.xs ? 'small' : 'middle'} icon={<DeleteOutlined />}>
              {!screens.xs && 'Fshi'}
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: screens.xs ? '12px' : '24px', background: '#f0f2f5', minHeight: '100vh' }}>
    

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card 
            style={{ borderRadius: 12, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            bodyStyle={{ padding: '16px' }}
          >
            <Statistic
              title="Total Pjesë"
              value={parts.length}
              prefix={<AppstoreOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card 
            style={{ borderRadius: 12, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            bodyStyle={{ padding: '16px' }}
          >
            <Statistic
              title="Pjesë Në Alarm"
              value={parts.filter(p => p.stock <= p.reorderLevel).length}
              prefix={<Alert style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card 
            style={{ borderRadius: 12, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            bodyStyle={{ padding: '16px' }}
          >
            <Statistic
              title="Total Furnitorë"
              value={suppliers.length}
              prefix={<ShopOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card 
            style={{ borderRadius: 12, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            bodyStyle={{ padding: '16px' }}
          >
            <Statistic
              title="Vlera Totale"
              value={parts.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}
              prefix="€"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Card 
        style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        bodyStyle={{ padding: screens.xs ? '16px' : '24px' }}
      >
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          type="card"
          size={screens.xs ? 'small' : 'middle'}
        >
          <TabPane 
            tab={
              <span>
                <AppstoreOutlined />
                Inventari
              </span>
            } 
            key="inventory"
          >
            <div style={{ marginBottom: 16, display: 'flex', flexDirection: screens.xs ? 'column' : 'row', gap: '12px' }}>
              <Input
                placeholder="Kërko pjesë..."
                prefix={<SearchOutlined />}
                size={screens.xs ? 'small' : 'middle'}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={screens.xs ? { marginBottom: 12 } : { width: 300 }}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size={screens.xs ? 'small' : 'middle'}
                onClick={() => {
                  setEditingPart(null);
                  form.resetFields();
                  setIsPartModalVisible(true);
                }}
                style={screens.xs ? {} : { marginLeft: 'auto' }}
              >
                {screens.xs ? 'Shto' : 'Shto Pjesë'}
              </Button>
            </div>

            {parts.filter(p => p.stock <= p.reorderLevel).length > 0 && (
              <Alert
                type="warning"
                message={`${parts.filter(p => p.stock <= p.reorderLevel).length} pjesë në stok kritik`}
                description="Këto pjesë kanë nevojë për rimbushje të menjëhershme."
                showIcon
                style={{ marginBottom: 16 }}
                closable
              />
            )}

            <Table
              columns={partColumns}
              dataSource={filteredParts}
              rowKey="id"
              scroll={{ x: true }}
              size={screens.xs ? 'small' : 'middle'}
              pagination={{ 
                pageSize: 5, 
                showSizeChanger: false,
                showTotal: (total, range) => `${range[0]}-${range[1]} nga ${total} pjesë` 
              }}
            />
          </TabPane>

          <TabPane 
            tab={
              <span>
                <ShopOutlined />
                Furnitorët
              </span>
            } 
            key="suppliers"
          >
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size={screens.xs ? 'small' : 'middle'}
                onClick={() => {
                  setEditingSupplier(null);
                  setIsSupplierModalVisible(true);
                }}
              >
                {screens.xs ? 'Shto' : 'Shto Furnitor'}
              </Button>
            </div>

            <Table
              dataSource={suppliers}
              rowKey="id"
              size={screens.xs ? 'small' : 'middle'}
              pagination={{ pageSize: 5 }}
              columns={supplierColumns}
              scroll={{ x: true }}
            />
          </TabPane>

          <TabPane 
            tab={
              <span>
                <GlobalOutlined />
                Prodhuesit
              </span>
            } 
            key="manufacturers"
          >
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size={screens.xs ? 'small' : 'middle'}
                onClick={() => setIsManufacturerModalVisible(true)}
              >
                {screens.xs ? 'Shto' : 'Shto Prodhues'}
              </Button>
            </div>

            <Table
              columns={manufacturerColumns}
              dataSource={manufacturers}
              rowKey="id"
              size={screens.xs ? 'small' : 'middle'}
              pagination={{ pageSize: 5 }}
              scroll={{ x: true }}
            />
          </TabPane>

          <TabPane 
            tab={
              <span>
                <AppstoreOutlined />
                Kategoritë
              </span>
            } 
            key="categories"
          >
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="primary"
                size={screens.xs ? 'small' : 'middle'}
                onClick={() => setIsCategoryModalVisible(true)}
              >
                {screens.xs ? 'Shto' : 'Shto Kategori'}
              </Button>
            </div>

            <Row gutter={[16, 16]}>
              {categories.map(category => (
                <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
                  <Card 
                    size="small" 
                    style={{ borderRadius: 8 }}
                    actions={[
                      <Popconfirm
                        title="Jeni i sigurt që dëshironi të fshini këtë kategori?"
                        onConfirm={() => {
                          setCategories(categories.filter(c => c.id !== category.id));
                          message.success('Kategoria u fshi!');
                        }}
                        okText="Po"
                        cancelText="Jo"
                      >
                        <DeleteOutlined key="delete" style={{ color: '#ff4d4f' }} />
                      </Popconfirm>
                    ]}
                  >
                    <Card.Meta
                      title={category.name}
                      description={`ID: ${category.id}`}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* Part Modal */}
      <Modal
        title={editingPart ? 'Edito Pjesën' : 'Shto Pjesë të Re'}
        open={isPartModalVisible}
        onCancel={() => {
          setIsPartModalVisible(false);
          setEditingPart(null);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
        width={screens.xs ? '90%' : 600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingPart || {
            categoryId: categories.length > 0 ? categories[0].id.toString() : undefined,
            stock: 0,
            reorderLevel: 10,
            compatibleModelIds: []
          }}
          onFinish={editingPart ? handleEditPart : handleAddPart}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="partNumber"
                label="Numri i Pjesës"
                rules={[{ required: true, message: 'Ju lutem shkruani numrin e pjesës!' }]}
              >
                <Input prefix="# " placeholder="BP-1001" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="Emri i Pjesës"
                rules={[{ required: true, message: 'Ju lutem shkruani emrin e pjesës!' }]}
              >
                <Input placeholder="Frena Disk" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="categoryId"
            label="Kategoria"
            rules={[{ required: true, message: 'Ju lutem zgjidhni kategorinë!' }]}
          >
            <Select placeholder="Zgjidhni kategorinë">
              {categories.map(c => (
                <Option key={c.id} value={c.id.toString()}>
                  {c.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="price"
                label="Çmimi (€)"
                rules={[{ required: true, message: 'Ju lutem shkruani çmimin!' }]}
              >
                <InputNumber 
                  min={0} 
                  style={{ width: '100%' }} 
                  placeholder="45.99"
                  step={0.01}
                  formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="stock"
                label="Sasia në stok"
                rules={[{ required: true, message: 'Ju lutem shkruani sasinë!' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="25" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="reorderLevel"
                label="Nivel i alarmit për rimbushje"
                rules={[{ required: true, message: 'Ju lutem shkruani nivelin!' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="10" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="location"
                label="Vendndodhja në depo"
              >
                <Input placeholder="A1-12" />
              </Form.Item>
            </Col>
          </Row>

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

          <Form.Item
            name="image"
            label="Ngarko imazhin e pjesës"
          >
            <Upload
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Zgjidhni skedarin</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              {editingPart ? 'Ruaj Ndryshimet' : 'Shto Pjesën'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Supplier Modal */}
      <Modal
        title={editingSupplier ? 'Edito Furnitorin' : 'Shto Furnitor të Ri'}
        open={isSupplierModalVisible}
        onCancel={() => {
          setIsSupplierModalVisible(false);
          setEditingSupplier(null);
        }}
        footer={null}
        destroyOnClose
        width={screens.xs ? '90%' : 600}
      >
        <Form
          layout="vertical"
          initialValues={editingSupplier || {
            status: 'Aktiv',
            manufacturerIds: []
          }}
          onFinish={editingSupplier ? handleEditSupplier : handleAddSupplier}
        >
          <Form.Item
            name="name"
            label="Emri i Furnitorit"
            rules={[{ required: true, message: 'Ju lutem shkruani emrin e furnitorit!' }]}
          >
            <Input prefix={<ShopOutlined />} placeholder="AutoParts Shpk" />
          </Form.Item>

          <Form.Item
            name="contactPerson"
            label="Personi Kontaktues"
            rules={[{ required: true, message: 'Ju lutem shkruani emrin e personit kontaktues!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Filan Fisteku" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="phone"
                label="Telefoni"
                rules={[{ required: true, message: 'Ju lutem shkruani numrin e telefonit!' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="+38344123456" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Ju lutem shkruani email-in!' },
                  { type: 'email', message: 'Email-i nuk është valid!' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="info@autoparts.com" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="address"
            label="Adresa"
          >
            <Input.TextArea placeholder="Rr. Lidhja e Prizrenit, Prishtinë" rows={2} />
          </Form.Item>

          <Form.Item
            name="manufacturerIds"
            label="Prodhuesit e përfaqësuar"
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Zgjidh prodhuesit"
            >
              {manufacturers.map(manufacturer => (
                <Option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Statusi"
            rules={[{ required: true, message: 'Ju lutem zgjidhni statusin!' }]}
          >
            <Select placeholder="Zgjidhni statusin">
              <Option value="Aktiv">Aktiv</Option>
              <Option value="Jo Aktiv">Jo Aktiv</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              {editingSupplier ? 'Ruaj Ndryshimet' : 'Shto Furnitorin'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Manufacturer Modal */}
      <Modal
        title={editingManufacturer ? 'Edito Prodhuesin' : 'Shto Prodhues të Ri'}
        open={isManufacturerModalVisible}
        onCancel={() => {
          setIsManufacturerModalVisible(false);
          setEditingManufacturer(null);
        }}
        footer={null}
        destroyOnClose
        width={screens.xs ? '90%' : 500}
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
            <Input placeholder="Bosch" />
          </Form.Item>

          <Form.Item
            name="country"
            label="Shteti"
            rules={[{ required: true, message: 'Ju lutem shkruani shtetin!' }]}
          >
            <Input placeholder="Gjermani" />
          </Form.Item>

          <Form.Item
            name="yearFounded"
            label="Viti i themelimit"
            rules={[{ required: true, message: 'Ju lutem shkruani vitin!' }]}
          >
            <InputNumber 
              min={1800} 
              max={new Date().getFullYear()} 
              style={{ width: '100%' }} 
              placeholder="1886"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              {editingManufacturer ? 'Ruaj Ndryshimet' : 'Shto Prodhuesin'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Category Modal */}
      <Modal
        title="Shto Kategori të Re"
        open={isCategoryModalVisible}
        onCancel={() => setIsCategoryModalVisible(false)}
        footer={null}
        destroyOnClose
        width={screens.xs ? '90%' : 400}
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
            <Input placeholder="Sistem Frenimi" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Shto Kategori
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SupplyInventoryDashboard;