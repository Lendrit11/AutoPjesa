import { Table, Card, Modal, Descriptions, Tag, Button, Input, Select, Space } from 'antd';
import React, { useState } from 'react';

const OrdersPage = () => {
  const [orders] = useState([
    {
      id: 1,
      orderNumber: 'ORD-001',
      customer: 'John Doe',
      status: 'Completed'
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customer: 'Jane Smith',
      status: 'Processing'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
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
      >
        {selectedOrder && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Nr. Porosisë">{selectedOrder.orderNumber}</Descriptions.Item>
            <Descriptions.Item label="Klienti">{selectedOrder.customer}</Descriptions.Item>
            <Descriptions.Item label="Statusi">
              <Tag color={selectedOrder.status === 'Completed' ? 'green' : 'blue'}>
                {selectedOrder.status}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default OrdersPage;