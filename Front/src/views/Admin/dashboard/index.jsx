import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Badge, Progress, Tooltip, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  AreaChart, Area, ResponsiveContainer, Tooltip as RTooltip, XAxis, BarChart, Bar,
} from 'recharts';

const { Title, Text } = Typography;

const API_BASE_URL = 'http://localhost:5298';

// Ikonat
const CaretUpIcon = ({ color }) => <span style={{ color, marginLeft: 4 }}>▲</span>;
const CaretDownIcon = ({ color }) => <span style={{ color, marginLeft: 4 }}>▼</span>;

// Tooltip për grafik
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

// Komponenta Ndryshim
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

// Komponenta Fusha
const Fusha = ({ name, number }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>{name}</span>
    <span>{number}</span>
  </div>
);

// Komponenta Kartela
const Kartela = ({ metaName, metaCount, body, footer, loading }) => (
  <Card 
    loading={loading} 
    bordered={false} 
    style={{ 
      marginBottom: 20, 
      borderRadius: 12, 
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
      minHeight: 260,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#fff'
    }}
    bodyStyle={{ padding: '24px 20px 20px', flex: 1 }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
      <Title level={5} style={{ margin: 0, color: '#2c3e50' }}>{metaName}</Title>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#1f2937' }}>{metaCount}</Text>
        <Tooltip title="Informata">
          <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
        </Tooltip>
      </div>
    </div>
    <div style={{ flexGrow: 1 }}>{body}</div>
    <div style={{ marginTop: 20 }}>{footer}</div>
  </Card>
);

// Përmbledhja
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
            metaName="Përdoruesit te Regjistruar"
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

// Funksion ndihmës për me marrë tokenin nga cookies
const getTokenFromCookie = () => {
  const tokenMatch = document.cookie.match(/(?:^|; )token=([^;]+)/);
  return tokenMatch ? decodeURIComponent(tokenMatch[1]) : null;
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token = getTokenFromCookie();

    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        const userCounts = await fetch(`${API_BASE_URL}/api/admin/dashboard/user-counts`, {
          headers,
          credentials: 'include',
        }).then(res => res.json());

        const userTrends = await fetch(`${API_BASE_URL}/api/admin/dashboard/user-registration-trends`, {
          headers,
          credentials: 'include',
        }).then(res => res.json());

        const salesSummary = await fetch(`${API_BASE_URL}/api/admin/dashboard/sales-summary`, {
          headers,
          credentials: 'include',
        }).then(res => res.json());

        const paymentsSummary = await fetch(`${API_BASE_URL}/api/admin/dashboard/payments-summary`, {
          headers,
          credentials: 'include',
        }).then(res => res.json());

        setDashboardData({
          ...userCounts,
          userRegistrationTrends: userTrends,
          salesSummary,
          paymentsSummary,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        navigate('/admin/login'); // nëse ka error auth
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div style={{ padding: 20, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: 24 }}>Dashboard Admin</Title>
      <Përmbledhje loading={loading} data={dashboardData} />
    </div>
  );
};

export default DashboardPage;
