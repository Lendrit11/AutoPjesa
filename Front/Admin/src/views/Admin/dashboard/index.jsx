import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Badge, Progress, List, Radio, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis,
  CartesianGrid, Legend, Brush,
} from 'recharts';
import dayjs from 'dayjs';

// Ikona SVG (placeholder)
const CaretUpIcon = ({ color }) => <span style={{ color }}>▲</span>;
const CaretDownIcon = ({ color }) => <span style={{ color }}>▼</span>;

// MOCK DATA
const trendData = new Array(14).fill(null).map((_, index) => ({
  name: dayjs().add(index, 'day').format('YYYY-MM-DD'),
  number: Math.floor(Math.random() * 8 + 1),
}));

const trafficData = new Array(20).fill(null).map((_, index) => ({
  name: dayjs().add(index * 30, 'minute').format('HH:mm'),
  traffic: Math.floor(Math.random() * 120 + 1),
  payments: Math.floor(Math.random() * 120 + 1),
}));

const pieData = {
  all: [
    { name: 'Brake Pads', value: 454, price: 89.99 },
    { name: 'Oil Filters', value: 332, price: 24.99 },
    { name: 'Spark Plugs', value: 287, price: 12.99 },
    { name: 'Air Filters', value: 198, price: 32.50 },
    { name: 'Timing Belts', value: 156, price: 45.75 },
    { name: 'Others', value: 132, price: 0 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#E36E7E', '#8F66DE'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="customTooltip">
      <span className="customTooltip-title">
        <Badge color={payload[0].fill} /> {label} : {payload[0].value}
      </span>
    </div>
  );
};

const Trend = ({ wow, dod, style }) => (
  <div className="trend" style={style}>
    <div className="trend-item">
      <span className="trend-item-label">WoW Change</span>
      <span className="trend-item-text">{wow}</span>
      <CaretUpIcon color="#f5222d" />
    </div>
    <div className="trend-item">
      <span className="trend-item-label">DoD Change</span>
      <span className="trend-item-text">{dod}</span>
      <CaretDownIcon color="#52c41a" />
    </div>
  </div>
);

const Field = ({ name, number }) => (
  <div className="field">
    <span className="field-label">{name}</span>
    <span className="field-number">{number}</span>
  </div>
);

const ColCard = ({ metaName, metaCount, body, footer, loading }) => (
  <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={6}>
    <Card loading={loading} className="overview" bordered={false}>
      <div className="overview-header">
        <div className="overview-header-meta">{metaName}</div>
        <div className="overview-header-count">{metaCount}</div>
        <Tooltip title="Introduce">
          <InfoCircleOutlined className="overview-header-action" />
        </Tooltip>
      </div>
      <div className="overview-body">{body}</div>
      <div className="overview-footer">{footer}</div>
    </Card>
  </Col>
);

const Overview = ({ loading }) => (
  <Row gutter={[12, 12]}>
    <ColCard
      loading={loading}
      metaName="Total Sales"
      metaCount="$ 126,560"
      body={<Trend wow="12%" dod="12%" />}
      footer={<Field name="Daily Sales" number="$12,423" />}
    />
    <ColCard
      loading={loading}
      metaName="Visits"
      metaCount="8846"
      body={
        <ResponsiveContainer height={100}>
          <AreaChart data={trendData}>
            <XAxis dataKey="name" hide />
            <RTooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="number" strokeOpacity={0} fill="#8E65D3" />
          </AreaChart>
        </ResponsiveContainer>
      }
      footer={<Field name="Daily Sales" number="1234" />}
    />
    <ColCard
      loading={loading}
      metaName="Payments"
      metaCount="6560"
      body={
        <ResponsiveContainer height={100}>
          <BarChart data={trendData}>
            <XAxis dataKey="name" hide />
            <RTooltip content={<CustomTooltip />} />
            <Bar dataKey="number" barSize={10} fill="#3B80D9" />
          </BarChart>
        </ResponsiveContainer>
      }
      footer={<Field name="Conversion Rate" number="60%" />}
    />
    <ColCard
      loading={loading}
      metaName="Operational Effect"
      metaCount="8846"
      body={<Progress strokeColor="#58BFC1" percent={85} />}
      footer={<Trend wow="12%" dod="12%" style={{ position: 'inherit' }} />}
    />
  </Row>
);

const SalePercent = ({ loading }) => {
  const [dataType, setDataType] = useState('all');
  const dataSet = pieData[dataType];

  return (
    <Card
      title="Top Selling Parts"
      loading={loading}
      extra={
        <Radio.Group value={dataType} onChange={e => setDataType(e.target.value)} buttonStyle="solid">
          <Radio.Button value="all">All Sales</Radio.Button>
        </Radio.Group>
      }
    >
      <Row gutter={20}>
        <Col xs={24} sm={12}>
          <ResponsiveContainer height={250}>
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length > 0) {
                    const { name, value, price } = payload[0].payload;
                    const total = dataSet.reduce((sum, item) => sum + item.value, 0);
                    const percent = ((value / total) * 100).toFixed(2) + '%';
                    const revenue = (value * price).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    });

                    return (
                      <div className="customTooltip">
                        <p><strong>{name}</strong></p>
                        <p>Sold: {value}</p>
                        <p>Revenue: {revenue}</p>
                        <p>Market Share: {percent}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={dataSet}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                strokeOpacity={0}
              >
                {dataSet.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col xs={24} sm={12}>
          <List
            bordered
            dataSource={dataSet}
            renderItem={(item, i) => {
              const total = dataSet.reduce((sum, part) => sum + part.value, 0);
              const percent = ((item.value / total) * 100).toFixed(2) + '%';
              const revenue = (item.value * item.price).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              });
              return (
                <List.Item>
                  <Badge color={COLORS[i % COLORS.length]} />
                  <span style={{ width: 120, display: 'inline-block' }}>{item.name}</span>
                  <span style={{ margin: '0 10px' }}>{item.value} sold</span>
                  <span>{revenue}</span>
                  <span style={{ float: 'right' }}>{percent}</span>
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

const TimeLine = ({ loading }) => (
  <Card loading={loading} style={{ marginTop: 12 }}>
    <ResponsiveContainer height={400}>
      <LineChart data={trafficData} syncId="anyId">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="traffic" stroke="#3F90F7" />
        <Line type="monotone" dataKey="payments" stroke="#61BE82" />
        <Brush dataKey="name" fill="#13c2c2" />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);

// Page Component
const DashboardPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Overview loading={loading} />
      <SalePercent loading={loading} />
      <TimeLine loading={loading} />
    </div>
  );
};

export default DashboardPage;
