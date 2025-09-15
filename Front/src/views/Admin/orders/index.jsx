import React, { useState, useEffect } from 'react';  
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Modal,
  Descriptions,
  Typography,
  Row,
  Col,
  Form,
  DatePicker,
  InputNumber,
  Dropdown,
  message,
  Grid
} from 'antd';
import {
  ShoppingCartOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  MoreOutlined,
  SearchOutlined,
  FileExcelOutlined,
  PlusOutlined
} from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = 'http://localhost:5298';
const { Text } = Typography;
const { useBreakpoint } = Grid;

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const OrdersPage = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userId');

  const statusColors = {
    'Pending': 'orange',
    'Processing': 'blue',
    'Shipped': 'purple',
    'Completed': 'green',
    'Cancelled': 'red'
  };
 const fetchOrders = async () => {
  setLoading(true);
  try {
    const token = getCookie('token');
   if (!token) {
  navigate('/admin/login');
  return;
}

    const res = await axios.get(`${API_BASE_URL}/api/admin/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setOrders(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error(err);
    message.error('Gabim gjatë marrjes së porosive');
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber?.includes(searchText) ||
      order.customer?.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Modals
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
  setLoading(true);

  const token = getCookie('token');
 if (!token) {
  navigate('/admin/login');
  return;
}

  try {
    await axios.put(
      `${API_BASE_URL}/api/admin/orders/${orderId}/status`,
      JSON.stringify(newStatus),
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    message.success(`Statusi u përditësua në ${newStatus}`);
    await fetchOrders();
  } catch (err) {
    console.error(err);
    message.error('Gabim gjatë përditësimit të statusit');
  } finally {
    setLoading(false);
  }
};

const deleteOrder = async (orderId) => {
  setLoading(true);

  const token = getCookie('token');
 if (!token) {
  navigate('/admin/login');
  return;
}

  try {
    await axios.delete(`${API_BASE_URL}/api/admin/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    message.success('Porosia u fshi me sukses');
    setOrders(prev => prev.filter(o => o.id !== orderId));
  } catch (err) {
    console.error(err);
    message.error('Gabim gjatë fshirjes së porosisë');
  } finally {
    setLoading(false);
  }
};
  const handleExport = () => {
    message.info('Funksionaliteti i eksportit do të implementohet këtu');
  };

  const columns = [
    { title: 'Data', dataIndex: 'orderDate', key: 'orderDate', responsive: ['md'] },
    { title: 'Nr. Porosisë', dataIndex: 'orderNumber', key: 'orderNumber', responsive: ['sm'] },
    { title: 'Klienti', dataIndex: 'customer', key: 'customer', ellipsis: true },
    { title: 'Telefon', dataIndex: 'customerPhone', key: 'customerPhone', responsive: ['lg'] },
    {
      title: 'Pjesët',
      key: 'parts',
      render: (_, record) => (
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {record.parts?.slice(0, isMobile ? 1 : undefined).map(part => (
            <li key={part.partId}>{part.name} (x{part.quantity})</li>
          ))}
          {isMobile && record.parts?.length > 1 && <li>+{record.parts.length - 1} më shumë</li>}
        </ul>
      )
    },
    {
      title: 'Totali',
      dataIndex: 'total',
      key: 'total',
      render: total => `$${total?.toFixed(2)}`,
      responsive: ['sm']
    },
    {
      title: 'Statusi',
      dataIndex: 'status',
      key: 'status',
      render: status => <Tag color={statusColors[status]}>{status}</Tag>
    },
    {
      title: 'Veprime',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              { key: 'view', label: 'Shiko', icon: <SearchOutlined />, onClick: () => viewOrderDetails(record) },
              { key: 'process', label: 'Shëno si Proces', onClick: () => updateOrderStatus(record.id, 'Processing') },
              { key: 'ship', label: 'Shëno si Dërguar', onClick: () => updateOrderStatus(record.id, 'Shipped') },
              { key: 'complete', label: 'Shëno si Përfunduar', onClick: () => updateOrderStatus(record.id, 'Completed') },
              { key: 'cancel', label: 'Anulo Porosinë', danger: true, onClick: () => updateOrderStatus(record.id, 'Cancelled') },
              { type: 'divider' },
              { key: 'delete', label: 'Fshi Porosinë', danger: true, onClick: () => deleteOrder(record.id) }
            ]
          }}
          trigger={['click']}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      )
    }
  ];

  const stats = Array.isArray(orders) ? [
    { title: 'Porosi Totale', value: orders.length, icon: <ShoppingCartOutlined /> },
    { title: 'Në Pritje', value: orders.filter(o => o.status === 'Pending').length, icon: <ClockCircleOutlined /> },
    { title: 'Në Proces', value: orders.filter(o => o.status === 'Processing').length, icon: <SyncOutlined spin /> },
    { title: 'Përfunduar', value: orders.filter(o => o.status === 'Completed').length, icon: <CheckCircleOutlined /> }
  ] : [];

  return (
    <div style={{ padding: isMobile ? 8 : 24 }}>
      <Card
        title="Menaxhimi i Porosive"
        extra={
          <Space wrap>
            <Input.Search
              placeholder="Kërko..."
              onSearch={value => setSearchText(value)}
              allowClear
              style={{ width: isMobile ? 150 : 200 }}
              size={isMobile ? 'small' : 'middle'}
            />
            <Select
              defaultValue="all"
              onChange={setStatusFilter}
              style={{ minWidth: isMobile ? 120 : 150 }}
              size={isMobile ? 'small' : 'middle'}
              options={[
                { value: 'all', label: isMobile ? 'Të gjitha' : 'Të gjitha statuset' },
                { value: 'Pending', label: isMobile ? 'Pritje' : 'Në pritje' },
                { value: 'Processing', label: isMobile ? 'Proces' : 'Në proces' },
                { value: 'Shipped', label: isMobile ? 'Dërguar' : 'Dërguar' },
                { value: 'Completed', label: isMobile ? 'Përfunduar' : 'Përfunduar' },
                { value: 'Cancelled', label: isMobile ? 'Anuluar' : 'Anuluar' }
              ]}
            />
            <Button icon={<FileExcelOutlined />} onClick={handleExport} size={isMobile ? 'small' : 'middle'}>Eksporto</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCreateModalOpen(true)} size={isMobile ? 'small' : 'middle'}>Porosi e Re</Button>
          </Space>
        }
      >
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          {stats.map(({ title, value, icon }) => (
            <Col xs={24} sm={12} md={6} key={title} style={{ backgroundColor: '#f5f5f5', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <Text strong>{value}</Text>
              <div>{title}</div>
            </Col>
          ))}
        </Row>
        <Table
          columns={columns}
          dataSource={filteredOrders}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: isMobile ? 5 : 10 }}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      {/* Modal për detajet */}
      <Modal
        title={`Detajet e Porosisë ${selectedOrder ? selectedOrder.orderNumber : ''}`}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        width={isMobile ? '90%' : 700}
      >
        {selectedOrder && (
          <Descriptions bordered column={isMobile ? 1 : 2} size="small" layout={isMobile ? 'vertical' : 'horizontal'}>
            <Descriptions.Item label="Nr. Porosisë">{selectedOrder.orderNumber}</Descriptions.Item>
            <Descriptions.Item label="Data">{moment(selectedOrder.orderDate).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="Klienti">{selectedOrder.customer}</Descriptions.Item>
            <Descriptions.Item label="Telefon">{selectedOrder.customerPhone}</Descriptions.Item>
            <Descriptions.Item label="Adresa për Dërgesë" span={2}>{selectedOrder.shippingAddress}</Descriptions.Item>
            <Descriptions.Item label="Pjesët" span={2}>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {selectedOrder.parts?.map(part => (
                  <li key={part.partId}>{part.name} - Sasi: {part.quantity} - Çmim: ${part.price?.toFixed(2)}</li>
                ))}
              </ul>
            </Descriptions.Item>
            <Descriptions.Item label="Totali" span={2}><Text strong>${selectedOrder.total?.toFixed(2)}</Text></Descriptions.Item>
            <Descriptions.Item label="Statusi" span={2}><Tag color={statusColors[selectedOrder.status]}>{selectedOrder.status}</Tag></Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Modal për krijimin e porosisë së re */}
     <Modal
  title="Krijo Porosi të Re"
  open={isCreateModalOpen}
  onCancel={() => setIsCreateModalOpen(false)}
  footer={null}
  width={isMobile ? '90%' : 600}
>
  <Form
    layout="vertical"
    initialValues={{
      parts: [{ partId: '', name: '', quantity: 1, price: 0 }]
    }}
   onFinish={async (values) => {
  const token = getCookie('token');
if (!token) {
  navigate('/admin/login');
  return;
}

  try {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      customerPhone: values.customerPhone,
      orderDate: values.orderDate.format('YYYY-MM-DD'),
      shippingAddress: values.shippingAddress,
      parts: values.parts.map(p => ({
        partNumber: p.PartNumber,
        name: p.name,
        quantity: p.quantity
      }))
    };

    console.log('Payload:', payload); // për debug

    await axios.post(`${API_BASE_URL}/api/admin/orders`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    message.success('Porosia u krijua me sukses!');
    setIsCreateModalOpen(false);
    await fetchOrders();
  } catch (err) {
    console.error('Gabim gjatë krijimit të porosisë:', err);
    message.error('Gabim gjatë krijimit të porosisë');
  }
}}

  >
    <Form.Item
      label="Emri i klientit"
      name="firstName"
      rules={[{ required: true, message: 'Ju lutem shkruani emrin' }]}
    >
      <Input placeholder="Shkruani emrin e klientit" />
    </Form.Item>

    <Form.Item
      label="Mbiemri i klientit"
      name="lastName"
      rules={[{ required: true, message: 'Ju lutem shkruani mbiemrin' }]}
    >
      <Input placeholder="Shkruani mbiemrin e klientit" />
    </Form.Item>

    <Form.Item
      label="Numri i telefonit"
      name="customerPhone"
      rules={[{ required: true, message: 'Ju lutem shkruani numrin e telefonit' }]}
    >
      <Input placeholder="Shkruani numrin e telefonit" />
    </Form.Item>

    <Form.Item
      label="Data e Porosisë"
      name="orderDate"
      rules={[{ required: true, message: 'Ju lutem zgjidhni datën e porosisë' }]}
    >
      <DatePicker style={{ width: '100%' }} />
    </Form.Item>

    <Form.List name="parts">
      {(fields, { add, remove }) => (
        <>
          <Text strong>Pjesët</Text>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'PartNumber']}
                rules={[{ required: true, message: 'Shkruani Numri i Pjesës' }]}
              >
                <Input placeholder="Numri i Pjesës" />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, 'name']}
                rules={[{ required: true, message: 'Shkruani emrin e pjesës' }]}
              >
                <Input placeholder="Emri i pjesës" />
              </Form.Item>

              <Form.Item
                {...restField}
                name={[name, 'quantity']}
                rules={[{ required: true, message: 'Sasia duhet të jetë > 0' }]}
                initialValue={1}
              >
                <InputNumber min={1} placeholder="Sasia" />
              </Form.Item>

              <Form.Item
            {...restField}
            name={[name, 'price']}
            rules={[{ required: true, message: 'Çmimi është i nevojshëm' }]}
          >
            <InputNumber
              min={0}
              step={0.01}
              placeholder="Çmimi"
              readOnly
              formatter={value => `$ ${value}`}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

              {fields.length > 1 && (
                <Button danger onClick={() => remove(name)}>Hiq</Button>
              )}
            </Space>
          ))}
          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
            Shto pjesë të re
          </Button>
        </>
      )}
    </Form.List>

    <Form.Item
      label="Adresa për Dërgesë"
      name="shippingAddress"
      rules={[{ required: true, message: 'Ju lutem shkruani adresën' }]}
    >
      <Input.TextArea rows={2} placeholder="Shkruani adresën e dërgesës" />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" block>
        Krijo Porosi
      </Button>
    </Form.Item>
  </Form>
</Modal>

    </div>
  );
};

export default OrdersPage;
