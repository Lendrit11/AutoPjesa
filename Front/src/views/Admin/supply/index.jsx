import React, { useState } from 'react';
import {
  Card,
  Table,
  Tabs,
  Typography,
  Row,
  Col,
  Statistic,
  Tag,
  Space,
  Button,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Title } = Typography;

const SupplyInventoryDashboard = () => {
  // MOCK DATA
  const [categories] = useState([
    { id: 1, name: 'Sistem Frenimi' },
    { id: 2, name: 'Motor' },
    { id: 3, name: 'Transmisioni' }
  ]);

  const [manufacturers] = useState([
    { id: 1, name: 'Bosch', country: 'Gjermani', yearFounded: 1886 },
    { id: 2, name: 'Valeo', country: 'Francë', yearFounded: 1923 }
  ]);

  const [parts] = useState([
    {
      id: 1,
      partNumber: 'BP-1001',
      name: 'Frena Disk',
      categoryId: 1,
      price: 45.99,
      stock: 25,
      reorderLevel: 10,
      location: 'A1-12',
      compatibleModelIds: []
    }
  ]);

  const [suppliers] = useState([
    {
      id: 1,
      name: 'AutoParts Shpk',
      contactPerson: 'Filan Fisteku',
      phone: '+38344123456',
      email: 'info@autoparts.com',
      status: 'Aktiv'
    }
  ]);

  // COLUMNS for tables
  const partColumns = [
    { title: 'Numri', dataIndex: 'partNumber', key: 'partNumber' },
    { title: 'Emri', dataIndex: 'name', key: 'name' },
    { title: 'Çmimi (€)', dataIndex: 'price', key: 'price' },
    { title: 'Stoku', dataIndex: 'stock', key: 'stock' },
  ];

  const supplierColumns = [
    { title: 'Emri', dataIndex: 'name', key: 'name' },
    { title: 'Personi Kontaktues', dataIndex: 'contactPerson', key: 'contactPerson' },
    { title: 'Telefoni', dataIndex: 'phone', key: 'phone' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Statusi',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'Aktiv' ? 'green' : 'red'}>
          {status}
        </Tag>
      )
    }
  ];

  const manufacturerColumns = [
    { title: 'Emri', dataIndex: 'name', key: 'name' },
    { title: 'Shteti', dataIndex: 'country', key: 'country' },
    { title: 'Viti', dataIndex: 'yearFounded', key: 'yearFounded' },
  ];

  const categoryColumns = [
    { title: 'Emri', dataIndex: 'name', key: 'name' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Paneli i Inventarit dhe Furnitorëve</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Pjesë" value={parts.length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Furnitorë" value={suppliers.length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Prodhues" value={manufacturers.length} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Kategori" value={categories.length} />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="inventory">
        <TabPane tab="Inventari" key="inventory">
          <Card title="Lista e Pjesëve">
            <Table
              columns={partColumns}
              dataSource={parts}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="Furnitorët" key="suppliers">
          <Card title="Lista e Furnitorëve">
            <Table
              columns={supplierColumns}
              dataSource={suppliers}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="Prodhuesit" key="manufacturers">
          <Card title="Lista e Prodhuesve">
            <Table
              columns={manufacturerColumns}
              dataSource={manufacturers}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>
        <TabPane tab="Kategoriat" key="categories">
          <Card title="Lista e Kategorive">
            <Table
              columns={categoryColumns}
              dataSource={categories}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SupplyInventoryDashboard;
