import './index.less';

import { Button, Checkbox, Form, Input, theme as antTheme } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { formatSearch } from '../../../utils/formatSearch';

// Initial form values
const initialValues = {
  username: 'guest',
  password: 'guest',
  // remember: true,
};

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = antTheme.useToken();

  const onFinished = async (form) => {
    // Këtu bëhet login request ose auth
    console.log('Form data:', form);

    const redirect = formatSearch(location.search).redirect || '/';
    navigate(redirect);
  };

  return (
    <div className="login-page" style={{ backgroundColor: token.colorBgContainer }}>
      <Form onFinish={onFinished} className="login-page-form" initialValues={initialValues}>
        <h2>REACT AND ADMIN</h2>

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
          <Button htmlType="submit" type="primary" className="login-page-form_button">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
