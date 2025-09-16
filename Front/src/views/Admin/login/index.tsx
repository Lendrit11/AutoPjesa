import React from 'react';
import { Button, Checkbox, Form, Input, theme as antTheme } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.less';

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
  remember: false,
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = antTheme.useToken();

  // ✅ Funksioni për të ruajtur token në cookie
  const setTokenCookie = (token: string, remember: boolean) => {
    if (remember) {
      const expires = new Date(Date.now() + 7 * 864e5).toUTCString(); // 7 ditë
      document.cookie = `token=${encodeURIComponent(token)}; expires=${expires}; path=/`;
    } else {
      document.cookie = `token=${encodeURIComponent(token)}; path=/`; // session cookie
    }
  };

  const onFinished = async (form: LoginFormValues) => {
    try {
      const response = await axios.post('http://localhost:5298/admin/login/Auth', {
        email: form.email,
        password: form.password,
      });

      const { token } = response.data;

      if (!token) {
        toast.error('❌ Token not received from server');
        return;
      }

      // ✅ Ruaj token në cookie
      setTokenCookie(token, !!form.remember);

      toast.success('✅ Logged in successfully!');
      navigate('/admin/dashboard');
      window.location.reload(); // opsionale

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data || 'Login failed';
        console.error('Axios error:', message);
        toast.error(`❌ ${message}`);
      } else {
        console.error('Unexpected error:', error);
        toast.error('❌ An unexpected error occurred.');
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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Form
        onFinish={onFinished}
        initialValues={initialValues}
        className="login-page-form"
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
          <Input.Password placeholder="Password" />
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
