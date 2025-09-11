import React from 'react';
import { Button, Checkbox, Form, Input, theme as antTheme } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // ⬅️ import toast
import 'react-toastify/dist/ReactToastify.css'; // ⬅️ import CSS

import './index.less';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = antTheme.useToken();

  const onFinished = async (form) => {
    try {
      const response = await axios.post('http://localhost:5298/admin/login/Auth', {
        email: form.email,
        password: form.password,
      });

      const data = response.data;
      console.log('Login sukses:', data);

      // Sukses mesazh (opsional)
      toast.success('Logged in successfully!');

      // Navigate
      navigate('/admin/dashboard');
    } catch (error) {
      if (error.response) {
        console.error('Login error:', error.response.data);
        toast.error(error.response.data); // toast gabimi
      } else {
        console.error('Network error:', error.message);
        toast.error('Network error: ' + error.message);
      }
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundColor: 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      {/* Toast container për me i shfaq mesazhet */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Form
        onFinish={onFinished}
        className="login-page-form"
        initialValues={initialValues}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>AutoPjesa Login</h2>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
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
