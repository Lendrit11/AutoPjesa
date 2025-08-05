import React, { useState } from 'react';
import {
  Card,
  Table,
  Typography
} from 'antd';

const { Title } = Typography;

const SupplyInventoryDashboard = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Sistem Frenimi' },
    { id: 2, name: 'Motor' },
    { id: 3, name: 'Transmisioni' }
  ]);

  const [manufacturers, setManufacturers] = useState([
    { id: 1, name: 'Bosch', country: 'Gjermani', yearFounded: 1886 },
    { id: 2, name: 'Valeo', country: 'Francë', yearFounded: 1923 }
  ]);

  const [parts, setParts] = useState([
    {
      id: 1,
      partNumber: 'BP-1001',
      name: 'Frena Disk',
      categoryId: 1,
      price: 45.99,
      stock: 25
    }
  ]);

  const categoryColumns = [
    { title: 'Emri', dataIndex: 'name', key: 'name' }
  ];

  const manufacturerColumns = [
    { title: 'Emri', dataIndex: 'name', key: 'name' },
    { title: 'Shteti', dataIndex: 'country', key: 'country' },
    { title: 'Viti', dataIndex: 'yearFounded', key: 'yearFounded' }
  ];

  const partColumns = [
    { title: 'Numri', dataIndex: 'partNumber', key: 'partNumber' },
    { title: 'Emri', dataIndex: 'name', key: 'name' },
    {
      title: 'Kategoria',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (catId) => categories.find(c => c.id === catId)?.name || 'Pa Kategori'
    },
    { title: 'Çmimi (€)', dataIndex: 'price', key: 'price' },
    { title: 'Stoku', dataIndex: 'stock', key: 'stock' }
  ];

  return (
    <div>
      <Title level={2}>Paneli i Inventarit dhe Furnitorëve</Title>

      <Card title="Kategoriat" style={{ marginBottom: 20 }}>
        <Table
          dataSource={categories}
          columns={categoryColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Card title="Prodhuesit" style={{ marginBottom: 20 }}>
        <Table
          dataSource={manufacturers}
          columns={manufacturerColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>

    </div>
  );
};

export default SupplyInventoryDashboard;
