import { Form, FormInstance, Input } from 'antd';
import axios from 'axios';
import React, { lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import images from '../../../assets/images';
import { BASE_API_URL } from '../../../constants';

import styles from './SignUp.module.scss';
import classNames from 'classnames/bind';

const Button = lazy(() => import('../../../components/Button'));

const SignUp = () => {
  const cx = classNames.bind(styles);

  const navigate = useNavigate();
  const formRef = React.useRef<FormInstance>(null);
  const onFinish = (values: any) => {
    axios
      .post(`${BASE_API_URL}/auth/register`, values)
      .then((response) => {
        if (response) {
          navigate('/auth/login');
          toast.success('Đăng ký thành công, vui lòng đăng nhập', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <SMain>
      <SModal>
        <SLogo>
          <img src={images.logoSm} alt="MiHealthCare Logo" />
        </SLogo>
        <STitle>Đăng ký sử dụng dịch vụ</STitle>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ paddingRight: '20%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập vào email của bạn' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên của bạn"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập vào của bạn',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập vào mật khẩu' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Tên trung tâm"
            name="merchantName"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập vào tên trung tâm của bạn',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại của cửa hàng"
            name="merchantPhoneNumber"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập vào số điện thoại của trung tâm',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ cửa hàng"
            name="merchantAddress"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập vào địa chỉ của trung tâm',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Chọn subdomain"
            name="subdomain"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập vào subdomain của trung tâm',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="submit" label="Đăng ký" maxWidth="100%" />
          </Form.Item>
        </Form>
      </SModal>
    </SMain>
  );
};

const SModal = styled.div`
  width: 860px;
  margin: auto;
  background-color: white;
  padding: 30px 0px;
`;

const SMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SLogo = styled.div`
  /* width: 100px; */
  img {
    width: 100px;
    height: 100px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STitle = styled.div`
  color: #2b3173;
  font-size: 32px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 30px;
`;

export default SignUp;
