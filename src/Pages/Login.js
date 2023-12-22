import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.scss"
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import WrapperHoc from '../hoc/WrapperHoc';
import { useDispatch ,useSelector} from 'react-redux';
import { LOGIN_USER } from '../Redux/LoginSlicer';

const Login = () => {
const dispatch =useDispatch()
const {validationErrors , existsUSer} = useSelector(state => state.login);
console.log(validationErrors ,existsUSer );
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    dispatch(LOGIN_USER(values))
  };

 
  return (
   <WrapperHoc>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
             name="email"
             rules={[
               {
                 required: true,
                 message: "Please input your email!",
               },
             ]}
            >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
              help={existsUSer} 
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <h2>P@ssw0rd</h2>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
      
            </Form.Item>
      
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
               Or <Link  to="/register"> register now!</Link>
            </Form.Item>
          </Form>
   </WrapperHoc>
     
  );
};
export default Login;