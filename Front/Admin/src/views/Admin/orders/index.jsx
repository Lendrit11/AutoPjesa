import React, { useState } from 'react';
import { Card, Table, Tag, Button, Modal, Form, Input, InputNumber, Select } from 'antd';

const { Option } = Select;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showOrderDetails = (record) => {
    console.log('Order Details:', record);
    Modal.info({
      title: 'Order Details',
      content: (
        <div>
          <p><strong>Customer:</strong> {record.customer}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <p><strong>Total:</strong> ${record.total}</p>
        </div>
      ),
    });
  };

  const handleAddOrder = () => {
    form.validateFields().then(values => {
      const newOrder = {
        key: Date.now(),
        ...values,
        status: 'Pending',
      };
      setOrders([...orders, newOrder]);
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Total ($)',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        let color = status === 'Delivered' ? 'green' : 'volcano';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => showOrderDetails(record)}>Details</Button>
      ),
    },
  ];

  return (
    <Card title="Orders Management" extra={<Button onClick={() => setIsModalVisible(true)}>Add Order</Button>}>
      <Table columns={columns} dataSource={orders} />
      
      <Modal
        title="Add New Order"
        visible={isModalVisible}
        onOk={handleAddOrder}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="customer" label="Customer Name" rules={[{ required: true, message: 'Please enter customer name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="total" label="Total ($)" rules={[{ required: true, message: 'Please enter total amount' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Pending">Pending</Option>
              <Option value="Delivered">Delivered</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default OrdersPage;
