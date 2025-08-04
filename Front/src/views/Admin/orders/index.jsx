import { Table, Card, Modal, Descriptions, Tag, Button, Input, Select, Space, Form, DatePicker, Grid } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
    <>
      <Card 
        title="Porositë" 
        extra={
          <Space>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Porosi e Re
            </Button>
            <Input.Search
              placeholder="Kërko klient..."
              onSearch={setSearchText}
              allowClear
            />
            <Select
              defaultValue="all"
              onChange={setStatusFilter}
              options={[
                { value: 'all', label: 'Të gjitha' },
                { value: 'Completed', label: 'Përfunduar' },
                { value: 'Processing', label: 'Në proces' }
              ]}
            />
          </Space>
        }
      >
        <Table dataSource={filteredOrders} columns={columns} rowKey="id" />
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
    </>
  );
};

export default OrdersPage;