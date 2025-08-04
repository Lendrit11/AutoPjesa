import { Table, Card, Modal, Descriptions, Tag, Button, Input, Select, Space, Form, DatePicker, Grid, Statistic, Row, Col, Dropdown, InputNumber, Typography } from 'antd';
import { PlusOutlined, FileExcelOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const { Text } = Typography;
const { useBreakpoint } = Grid;

const OrdersPage = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'ORD-001',
      customer: 'John Doe',
      customerPhone: '+38344123456',
      orderDate: '2023-05-15',
      parts: [
        { partId: 'BP-001', name: 'Brakepads', quantity: 2, price: 45.00 },
        { partId: 'OF-100', name: 'Oil Filter', quantity: 1, price: 30.50 }
      ],
      total: 120.50,
      status: 'Completed',
      shippingAddress: 'Prishtinë, Rr. Lidhja e Prizrenit'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customer: 'Jane Smith',
      customerPhone: '+38349123456',
      orderDate: '2023-05-16',
      parts: [
        { partId: 'SP-010', name: 'Spark Plugs', quantity: 4, price: 12.00 },
        { partId: 'AF-200', name: 'Air Filter', quantity: 1, price: 25.99 }
      ],
      total: 73.99,
      status: 'Processing',
      shippingAddress: 'Prizren, Rr. UÇK'
    }
  ]);

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.includes(searchText) ||
      order.customer.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    'Pending': 'orange',
    'Processing': 'blue',
    'Shipped': 'purple',
    'Completed': 'green',
    'Cancelled': 'red'
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const editOrder = (order) => {
    console.log(`Editimi i porosisë ${order.orderNumber}`);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setLoading(true);
    setTimeout(() => {
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      setLoading(false);
    }, 500);
  };

  const handleExport = () => {
    console.log('Eksporto të dhënat');
  };

  const stats = [
    { title: 'Porosi Totale', value: orders.length },
    { title: 'Përfunduar', value: orders.filter(o => o.status === 'Completed').length },
    { title: 'Në Proces', value: orders.filter(o => o.status === 'Processing').length }
  ];

  const columns = [
    {
      title: 'Data',
      dataIndex: 'orderDate',
      key: 'orderDate',
      responsive: ['md']
    },
    {
      title: 'Nr. Porosisë',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      responsive: ['sm']
    },
    {
      title: 'Klienti',
      dataIndex: 'customer',
      key: 'customer',
      ellipsis: true
    },
    {
      title: 'Telefon',
      dataIndex: 'customerPhone',
      key: 'customerPhone',
      responsive: ['lg']
    },
    {
      title: 'Pjesët',
      key: 'parts',
      render: (_, record) => (
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {record.parts.slice(0, isMobile ? 1 : undefined).map(part => (
            <li key={part.partId}>
              {part.name} (x{part.quantity})
            </li>
          ))}
          {isMobile && record.parts.length > 1 && (
            <li>+{record.parts.length - 1} më shumë</li>
          )}
        </ul>
      )
    },
    {
      title: 'Totali',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `$${total.toFixed(2)}`,
      responsive: ['sm']
    },
    {
      title: 'Statusi',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status]}>{status}</Tag>
      )
    },
    {
      title: 'Veprime',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'view',
                label: 'Shiko',
                icon: <SearchOutlined />,
                onClick: () => viewOrderDetails(record)
              },
              {
                key: 'edit',
                label: 'Edito',
                onClick: () => editOrder(record)
              }
            ]
          }}
          trigger={['click']}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: isMobile ? 8 : 24 }}>
      <Card
        title="Menaxhimi i Porosive"
        extra={
          <Space wrap>
            <Input.Search
              placeholder="Kërko..."
              onSearch={setSearchText}
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
                { value: 'Completed', label: isMobile ? 'Përfunduar' : 'Përfunduar' },
                { value: 'Processing', label: isMobile ? 'Proces' : 'Në proces' }
              ]}
            />
            <Button
              icon={<FileExcelOutlined />}
              onClick={handleExport}
              size={isMobile ? 'small' : 'middle'}
            >
              Eksporto
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalOpen(true)}
              size={isMobile ? 'small' : 'middle'}
            >
              Porosi e Re
            </Button>
          </Space>
        }
      >
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          {stats.map(({ title, value }) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              key={title}
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: 8,
                padding: 16,
                textAlign: 'center',
              }}
            >
              <Statistic title={title} value={value} />
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

      <Modal
        title={`Detajet e Porosisë ${selectedOrder ? selectedOrder.orderNumber : ''}`}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        width={isMobile ? '90%' : 700}
      >
        {selectedOrder && (
          <Descriptions
            bordered
            column={isMobile ? 1 : 2}
            size="small"
            layout={isMobile ? 'vertical' : 'horizontal'}
          >
            <Descriptions.Item label="Nr. Porosisë">{selectedOrder.orderNumber}</Descriptions.Item>
            <Descriptions.Item label="Data">{selectedOrder.orderDate}</Descriptions.Item>
            <Descriptions.Item label="Klienti">{selectedOrder.customer}</Descriptions.Item>
            <Descriptions.Item label="Telefon">{selectedOrder.customerPhone}</Descriptions.Item>
            <Descriptions.Item label="Adresa për Dërgesë" span={2}>
              {selectedOrder.shippingAddress}
            </Descriptions.Item>
            <Descriptions.Item label="Pjesët" span={2}>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {selectedOrder.parts.map(part => (
                  <li key={part.partId}>
                    {part.name} - Sasi: {part.quantity} - Çmim: ${part.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </Descriptions.Item>
            <Descriptions.Item label="Totali" span={2}>
              <Text strong>${selectedOrder.total.toFixed(2)}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Statusi" span={2}>
              <Tag color={statusColors[selectedOrder.status]}>{selectedOrder.status}</Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title="Krijo Porosi të Re"
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        footer={null}
        width={isMobile ? '90%' : 600}
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            const newOrder = {
              id: orders.length + 1,
              orderNumber: `ORD-${(orders.length + 1).toString().padStart(3, '0')}`,
              customer: values.customer,
              customerPhone: values.customerPhone,
              orderDate: values.orderDate.format('YYYY-MM-DD'),
              parts: values.parts,
              total: values.parts.reduce((sum, p) => sum + p.quantity * p.price, 0),
              status: 'Pending',
              shippingAddress: values.shippingAddress
            };
            setOrders([...orders, newOrder]);
            setIsCreateModalOpen(false);
          }}
          initialValues={{
            parts: [{ partId: '', name: '', quantity: 1, price: 0 }]
          }}
        >
          <Form.Item
            label="Klienti"
            name="customer"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Telefon"
            name="customerPhone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Data e Porosisë"
            name="orderDate"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.List name="parts">
            {(fields, { add, remove }) => (
              <>
                <Text strong>Pjesët</Text>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'partId']}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="ID Pjese" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Emri i pjesës" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'quantity']}
                      rules={[{ required: true }]}
                      initialValue={1}
                    >
                      <InputNumber min={1} placeholder="Sasia" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      rules={[{ required: true }]}
                      initialValue={0}
                    >
                      <InputNumber
                        min={0}
                        step={0.01}
                        placeholder="Çmimi"
                        formatter={value => `$ ${value}`}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button danger onClick={() => remove(name)}>
                        Hiq
                      </Button>
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
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={2} />
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