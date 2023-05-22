import React, { lazy } from "react";
import styled from "styled-components";
import { Checkbox, Form, FormInstance, Input, Select } from "antd";
import images from "../../../assets/images";
import { useParams } from "react-router-dom";
const Button = lazy(() => import("../../../components/Button"));
const { Option } = Select;

const SignUp = () => {
  const { type } = useParams();
  const formRef = React.useRef<FormInstance>(null);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onGenderChange = (value: string) => {
    switch (value) {
      case "male":
        formRef.current?.setFieldsValue({ note: "Hi, man!" });
        break;
      case "female":
        formRef.current?.setFieldsValue({ note: "Hi, lady!" });
        break;
      case "other":
        formRef.current?.setFieldsValue({ note: "Hi there!" });
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
        <STitle>Đăng ký trở thành nhà bán hàng</STitle>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ paddingRight: "20%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Full Name User"
            name="fullName"
            rules={[{ required: true, message: "Please input your fullName!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="male">User</Option>
              <Option value="female">Admin</Option>
              <Option value="other">Super Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Full Name Merchant"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Full Name Merchant!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Merchant"
            name="phone"
            rules={[
              { required: true, message: "Please input your Phone Merchant!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address Merchant"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your Address Merchant!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Subdomaint Merchant"
            name="subdomain"
            rules={[
              {
                required: true,
                message: "Please input your Subdomaint Merchant!",
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
