import { Form, FormInstance, Input, Select } from 'antd';
import axios from 'axios';
import React, { lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import images from '../../../assets/images';
import { BASE_API_URL } from '../../../constants';
const Button = lazy(() => import('../../../components/Button'));
const { Option } = Select;

const SignUp = () => {
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
        console.log('asdasd', response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        formRef.current?.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 'female':
        formRef.current?.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 'other':
        formRef.current?.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
        break;
    }
  };
  return (
    <SMain>
      <SModal>
        <SLogo>
          <img src={images.logoSm} alt="Aht Logo" />
        </SLogo>
        <STitle>Đăng ký trở thành trung tâm</STitle>
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
          {/* <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="1">1</Option>
            </Select>
          </Form.Item> */}
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

          {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="submit"
              label="Đăng ký"
              // classType={cx("btn-submit")}
              maxWidth="100%"
            />
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
