import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Badge, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  AreaChart, Area, BarChart, Bar,
  ResponsiveContainer, Tooltip as RTooltip, XAxis
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
      body={<div style={{ height: 100, display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '100%' }}>
          <div style={{ 
            height: 10, 
            background: '#58BFC1', 
            width: '85%',
            borderRadius: 5 
          }} />
          <div style={{ textAlign: 'center', marginTop: 10 }}>85%</div>
        </div>
      </div>}
      footer={<Trend wow="12%" dod="12%" style={{ position: 'inherit' }} />}
    />
  </Row>
);

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Overview loading={loading} />
    </div>
  );
};

export default DashboardPage;