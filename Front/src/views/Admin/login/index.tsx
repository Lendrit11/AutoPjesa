import React from 'react';
import { Button, Checkbox, Form, Input, theme as antTheme } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import loginAdminImage from '../../../assets/images/loginAdmin/admin.jpg';

import './index.less';

const initialValues = {
  username: 'guest',
  password: 'guest',
};

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = antTheme.useToken();

  const onFinished = async (form) => {
    console.log('Form data:', form);
    navigate('/admin/dashboard');
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${loginAdminImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Form
        onFinish={onFinished}
        className="login-page-form"
        initialValues={initialValues}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // tejdukshmëri 70%
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>AutoPjesa  Login</h2>

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please enter your username',
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
