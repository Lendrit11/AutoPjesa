import React, { useEffect, useState } from 'react';  
import { Row, Col, Card, Badge, Progress, List, Radio, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip as RTooltip, XAxis,
} from 'recharts';
import dayjs from 'dayjs';

const API_BASE_URL = 'http://localhost:5298';

// Ikonat
const CaretUpIcon = ({ color }) => <span style={{ color }}>▲</span>;
const CaretDownIcon = ({ color }) => <span style={{ color }}>▼</span>;

// CustomTooltip për charts
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid #ccc', padding: 10 }}>
      <span>
        <Badge color={payload[0].fill} /> {label} : {payload[0].value}
      </span>
    </div>
  );
};

// Ndryshim component
const Ndryshim = ({ wow, dod }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div>
      <span>Ndryshim Javë‐java: </span>
      <span>{wow}</span>
      <CaretUpIcon color="#f5222d" />
    </div>
    <div>
      <span>Ndryshim Ditë për Ditë: </span>
      <span>{dod}</span>
      <CaretDownIcon color="#52c41a" />
    </div>
  </div>
);

// Fusha component për emrin dhe numrin
const Fusha = ({ name, number }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>{name}</span>
    <span>{number}</span>
  </div>
);

// Kartela Card component
const Kartela = ({ metaName, metaCount, body, footer, loading }) => (
  <Card loading={loading} bordered={false} style={{ marginBottom: 16 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>{metaName}</div>
      <div>{metaCount}</div>
      <Tooltip title="Informata">
        <InfoCircleOutlined />
      </Tooltip>
    </div>
    <div style={{ marginTop: 10 }}>{body}</div>
    <div style={{ marginTop: 10 }}>{footer}</div>
  </Card>
);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#E36E7E', '#8F66DE'];

const Përmbledhje = ({ loading, data }) => {
  if (!data) return null;

  const {
    totalUsers,
    totalAdmins,
    newUsersThisMonth,
    newAdminsThisMonth,
    salesSummary,
    paymentsSummary,
    userRegistrationTrends,
  } = data;

  const trendData = userRegistrationTrends.map(item => ({
    name: item.date,
    number: item.users,
    admins: item.admins,
  }));

  return (
    <>
      {/* Rreshti i parë */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12}>
          <Kartela
            loading={loading}
            metaName="Shitje Totale"
            metaCount={`Euro ${typeof salesSummary?.totalSales === 'number' ? salesSummary.totalSales.toLocaleString() : '0'}`}
            body={<Ndryshim wow="12%" dod="12%" />}
          />
        </Col>
        <Col xs={24} sm={12}>
          <Kartela
            loading={loading}
            metaName="Përdoruesit Aktual"
            metaCount={totalUsers?.toLocaleString()}
            body={
              <ResponsiveContainer height={100}>
                <AreaChart data={trendData}>
                  <XAxis dataKey="name" hide />
                  <RTooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="number" strokeOpacity={0} fill="#8E65D3" />
                </AreaChart>
              </ResponsiveContainer>
            }
            footer={<Fusha name="Rritja Ditore" number={newUsersThisMonth?.toLocaleString()} />}
          />
        </Col>
      </Row>

      {/* Rreshti i dytë */}
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Kartela
            loading={loading}
            metaName="Pagesa"
            metaCount={paymentsSummary?.totalPayments?.toLocaleString()}
            body={
              <ResponsiveContainer height={100}>
                <BarChart data={paymentsSummary?.dailyPayments || []}>
                  <XAxis dataKey="Date" hide />
                  <RTooltip content={<CustomTooltip />} />
                  <Bar dataKey="Count" barSize={10} fill="#3B80D9" />
                </BarChart>
              </ResponsiveContainer>
            }
            footer={<Fusha name="Shkalla e Konvertimit" number="60%" />}
          />
        </Col>
        <Col xs={24} sm={12}>
          <Kartela
            loading={loading}
            metaName="Adminët në Sistem"
            metaCount={totalAdmins}
            body={<Progress strokeColor="#58BFC1" percent={100} />}
            footer={<Fusha name="Shtuar këtë muaj" number={newAdminsThisMonth} />}
          />
        </Col>
      </Row>
    </>
  );
};

const PërqindjeShitje = ({ loading }) => {
  const pieData = {
    all: [
      { name: 'Furça- frenash', value: 454, price: 89.99 },
      { name: 'Filtra të vajit', value: 332, price: 24.99 },
      { name: 'Pastila frenash', value: 287, price: 12.99 },
      { name: 'Filtra ajri', value: 198, price: 32.50 },
      { name: 'Belat kohore', value: 156, price: 45.75 },
      { name: 'Të tjera', value: 132, price: 0 },
    ],
  };

  const [dataType, setDataType] = useState('all');
  const dataSet = pieData[dataType];

  return (
    <Card
      title="Pjesët më të Shitura"
      loading={loading}
      extra={
        <Radio.Group value={dataType} onChange={e => setDataType(e.target.value)} buttonStyle="solid">
          <Radio.Button value="all">Të gjitha Shitjet</Radio.Button>
        </Radio.Group>
      }
    >
      <Row gutter={20}>
        <Col xs={24} sm={12}>
          <ResponsiveContainer height={250}>
            <PieChart>
              <RTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length > 0) {
                    const { name, value, price } = payload[0].payload;
                    const total = dataSet.reduce((sum, item) => sum + item.value, 0);
                    const percent = ((value / total) * 100).toFixed(2) + '%';
                    const revenue = (value * price).toLocaleString('sq-AL', {
                      style: 'currency',
                      currency: 'ALL',
                    });

                    return (
                      <div style={{ background: '#fff', padding: 10, border: '1px solid #ccc' }}>
                        <p><strong>{name}</strong></p>
                        <p>Shitur: {value}</p>
                        <p>Të ardhurat: {revenue}</p>
                        <p>Pjesë e tregut: {percent}</p>
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
              const revenue = (item.value * item.price).toLocaleString('sq-AL', {
                style: 'currency',
                currency: 'ALL',
              });
              return (
                <List.Item key={item.name}>
                  <Badge color={COLORS[i % COLORS.length]} />
                  <span style={{ width: 120, display: 'inline-block' }}>{item.name}</span>
                  <span style={{ margin: '0 10px' }}>{item.value} të shitura</span>
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

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const userCountsResponse = await fetch(`${API_BASE_URL}/api/admin/dashboard/user-counts`);
        const userCounts = await userCountsResponse.json();

        const userTrendsResponse = await fetch(`${API_BASE_URL}/api/admin/dashboard/user-registration-trends`);
        const userTrends = await userTrendsResponse.json();

        const salesSummaryResponse = await fetch(`${API_BASE_URL}/api/admin/dashboard/sales-summary`);
        const salesSummary = await salesSummaryResponse.json();

        const paymentsSummaryResponse = await fetch(`${API_BASE_URL}/api/admin/dashboard/payments-summary`);
        const paymentsSummary = await paymentsSummaryResponse.json();

        setDashboardData({
          ...userCounts,
          userRegistrationTrends: userTrends,
          salesSummary,
          paymentsSummary,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Përmbledhje loading={loading} data={dashboardData} />
      <PërqindjeShitje loading={loading} />
    </div>
  );
};

export default DashboardPage;
