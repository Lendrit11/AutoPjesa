import { Table, Card, Modal, Descriptions, Tag, Button, Input, Select, Space, Form, DatePicker, Grid, Statistic, Row, Col } from 'antd';
import { PlusOutlined, FileExcelOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const { useBreakpoint } = Grid;

const OrdersPage = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'ORD-001',
      customer: 'John Doe',
      status: 'Completed',
      orderDate: '2023-05-15'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customer: 'Jane Smith',
      status: 'Processing',
      orderDate: '2023-05-16'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [form] = Form.useForm();

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateOrder = (values) => {
    const newOrder = {
      id: orders.length + 1,
      orderNumber: `ORD-${(orders.length + 1).toString().padStart(3, '0')}`,
      customer: values.customer,
      status: 'Pending',
      orderDate: values.date.format('YYYY-MM-DD')
    };
    setOrders([...orders, newOrder]);
    setIsCreateModalOpen(false);
    form.resetFields();
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
      responsive: ['md']
    },
    { title: 'Nr. Porosisë', dataIndex: 'orderNumber' },
    { title: 'Klienti', dataIndex: 'customer' },
    { title: 'Statusi', dataIndex: 'status' },
    {
      title: 'Veprime',
      render: (_, record) => (
        <Button onClick={() => {
          setSelectedOrder(record);
          setIsModalOpen(true);
        }}>Shiko</Button>
      )
    }
  ];

  return (
    <div style={{ padding: isMobile ? 8 : 24 }}>
      <Card 
        title="Porositë" 
        extra={
          <Space wrap>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalOpen(true)}
              size={isMobile ? 'small' : 'middle'}
            >
              Porosi e Re
            </Button>
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
          pagination={{ pageSize: isMobile ? 5 : 10 }}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      <Modal
        title={`Detajet e Porosisë ${selectedOrder?.orderNumber}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={isMobile ? '90%' : 700}
      >
        {selectedOrder && (
          <Descriptions bordered column={isMobile ? 1 : 2}>
            <Descriptions.Item label="Nr. Porosisë">{selectedOrder.orderNumber}</Descriptions.Item>
            <Descriptions.Item label="Data">{selectedOrder.orderDate}</Descriptions.Item>
            <Descriptions.Item label="Klienti">{selectedOrder.customer}</Descriptions.Item>
            <Descriptions.Item label="Statusi">
              <Tag color={selectedOrder.status === 'Completed' ? 'green' : 'blue'}>
                {selectedOrder.status}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title="Krijo Porosi të Re"
        open={isCreateModalOpen}
        onCancel={() => {
          setIsCreateModalOpen(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        width={isMobile ? '90%' : 600}
      >
        <Form form={form} onFinish={handleCreateOrder} layout="vertical">
          <Form.Item 
            name="customer" 
            label="Klienti"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="date" 
            label="Data"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrdersPage;