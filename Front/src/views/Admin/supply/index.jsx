import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  message,
  Typography
} from 'antd';

const { Title } = Typography;

const SupplyInventoryDashboard = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Sistem Frenimi' },
    { id: 2, name: 'Motor' },
    { id: 3, name: 'Transmisioni' }
  ]);

  const categoryColumns = [
    { title: 'Emri', dataIndex: 'name', key: 'name' }
  ];

  return (
    <div>
      <Title level={2}>Paneli i Inventarit dhe Furnitorëve</Title>
      <Card title="Kategoriat">
        <Table
          dataSource={categories}
          columns={categoryColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default SupplyInventoryDashboard;
