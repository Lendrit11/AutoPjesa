import React, { useState, useEffect } from 'react';
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
  Spin
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
  ShopOutlined,
  CarOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { useBreakpoint } = Grid;
const { TabPane } = Tabs;
const { Option } = Select;
const { Title, Text } = Typography;

const API_BASE_URL = 'http://localhost:5298'; 

const SupplyInventoryDashboard = () => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [suppliersLoading, setSuppliersLoading] = useState(false);
  const [manufacturersLoading, setManufacturersLoading] = useState(false);

  // MOCK DATA për pjesët e tjera
  const [categories, setCategories] = useState([
    { id: 1, name: 'Sistem Frenimi' },
    { id: 2, name: 'Motor' },
    { id: 3, name: 'Transmisioni' },
    { id: 4, name: 'Sistem Elektrik' },
    { id: 5, name: 'Sistem Shasing' }
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
    }
  ]);

  // SUPPLIERS DATA nga API
  const [suppliers, setSuppliers] = useState([]);
  
  // MANUFACTURERS DATA nga API
 

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

  // FETCH SUPPLIERS nga API
  const fetchSuppliers = async () => {
    setSuppliersLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Suppliers`);
      setSuppliers(response.data);
    } catch (error) {
      console.error('Gabim gjatë marrjes së furnitorëve:', error);
      message.error('Failed to load suppliers');
    } finally {
      setSuppliersLoading(false);
    }
  };

 
  // EFFECT për të ngarkuar të dhënat kur tabi aktiv ndryshon
  useEffect(() => {
    if (activeTab === 'suppliers') {
      fetchSuppliers();
    }
  }, [activeTab]);

  // PART FUNCTIONS (mbetet si mock)
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

 

  // CATEGORY FUNCTIONS (mbetet si mock)
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
            onConfirm={() => handleDeleteManufacturer(record.manufacturerId)}
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
            onConfirm={() => handleDeleteSupplier(record.supplierId)}
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
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                    icon={<ReloadOutlined />}
                    size={screens.xs ? 'small' : 'middle'}
                    onClick={fetchSuppliers}
                    loading={suppliersLoading}
                >
                    {!screens.xs && 'Refresh'}
                </Button>
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

            <Spin spinning={suppliersLoading}>
                <Table
                    dataSource={suppliers}
                    rowKey="supplierId"
                    size={screens.xs ? 'small' : 'middle'}
                    pagination={{ pageSize: 5 }}
                    columns={supplierColumns}
                    scroll={{ x: true }}
                />
            </Spin>
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
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                    icon={<ReloadOutlined />}
                    size={screens.xs ? 'small' : 'middle'}
                    onClick={fetchManufacturers}
                    loading={manufacturersLoading}
                >
                    {!screens.xs && 'Refresh'}
                </Button>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size={screens.xs ? 'small' : 'middle'}
                    onClick={() => {
                        setEditingManufacturer(null);
                        setIsManufacturerModalVisible(true);
                    }}
                >
                    {screens.xs ? 'Shto' : 'Shto Prodhues'}
                </Button>
            </div>

            <Spin spinning={manufacturersLoading}>
                <Table
                    columns={manufacturerColumns}
                    dataSource={manufacturers}
                    rowKey="manufacturerId"
                    size={screens.xs ? 'small' : 'middle'}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: true }}
                />
            </Spin>
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
                    label="Vendndodhja"
                >
                    <Input placeholder="A1-12" />
                </Form.Item>
            </Col>
        </Row>

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
  >
    <Form
        key={editingSupplier ? editingSupplier.supplierId : 'new'}
        layout="vertical"
        initialValues={editingSupplier || { status: 'Aktiv' }}
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

        <Form.Item name="address" label="Adresa">
            <Input.TextArea placeholder="Rr. Lidhja e Prizrenit, Prishtinë" rows={2} />
        </Form.Item>

        <Form.Item
            name="status"
            label="Statusi"
            rules={[{ required: true, message: 'Ju lutem zgjidhni statusin!' }]}
        >
            <Select placeholder="Zgjidhni statusin">
                <Select.Option value="Aktiv">Aktiv</Select.Option>
                <Select.Option value="Jo Aktiv">Jo Aktiv</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
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
        key={editingManufacturer ? editingManufacturer.manufacturerId : 'new'}
        layout="vertical"
        initialValues={editingManufacturer || { yearFounded: 2000 }}
        onFinish={editingManufacturer ? handleEditManufacturer : handleAddManufacturer}
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

        

        <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
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