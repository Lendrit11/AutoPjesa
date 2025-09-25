import React from 'react';
import { Button, Checkbox, Form, Input, theme as antTheme } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import adminImage from '../../../assets/images/admin.webp';
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

  const setTokenCookie = (token: string, remember: boolean) => {
    if (remember) {
      const expires = new Date(Date.now() + 7 * 864e5).toUTCString(); // 7 ditë
document.cookie = `admin_token=${encodeURIComponent(token)}; path=/`;
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

      setTokenCookie(token, !!form.remember);

      toast.success('✅ Logged in successfully!');
      navigate('/admin/dashboard');
      window.location.reload();

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
        backgroundImage: `url(${adminImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Form
        onFinish={onFinished}
        initialValues={initialValues}
        className="login-page-form"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '15px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          padding: '30px 40px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          width: '100%',
          maxWidth: '400px',
          color: '#fff',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.8rem',
            letterSpacing: '1px',
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        >
          AutoPjesa Login
        </h2>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please enter your email' }]}
          style={{ color: '#fff' }}
        >
          <Input
            placeholder="Email"
            style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              border: 'none',
              color: '#fff',
              fontWeight: 400,
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            placeholder="Password"
            style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              border: 'none',
              color: '#fff',
              fontWeight: 400,
            }}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox style={{ color: '#fff', fontWeight: 400 }}>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
<Button
  htmlType="submit"
  type="primary"
  block
  style={{
    backgroundColor: '#092788cc', // më transparent / light
    border: 'none',
    fontWeight: 600,
    boxShadow: '0 4px 8px rgba(9, 39, 136, 0.4)', // shadow i butë dhe i përshtatshëm me ngjyrën
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  }}
  onMouseEnter={e => {
    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#092788ff';
    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 12px rgba(9, 39, 136, 0.6)';
  }}
  onMouseLeave={e => {
    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#092788cc';
    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 8px rgba(9, 39, 136, 0.4)';
  }}
>
  Login
</Button>

        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
