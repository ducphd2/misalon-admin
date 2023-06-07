import { Form, FormInstance, Input } from "antd";
import axios from "axios";
import React, { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import images from "../../../assets/images";
import { BASE_API_URL } from "../../../constants";

import styles from "./SignUp.module.scss";
import classNames from "classnames/bind";
import ModalDesignation from "../../../components/Modal";

const Button = lazy(() => import("../../../components/Button"));

const SignUp = () => {
  const cx = classNames.bind(styles);
  const [modelVerify, setShowModelVerify] = useState(false);
  const [DataUser, setShowDataUser] = useState({});

  const navigate = useNavigate();
  const formRef = React.useRef<FormInstance>(null);
  const onFinish = (values: any) => {
    axios
      .post(`${BASE_API_URL}/auth/register`, values)
      .then((response) => {
        if (response) {
          // navigate("/auth/login");
          const result = response.data.result.user;
          console.log("response", response);
          setShowModelVerify(true);
          setShowDataUser({ userId: result.id, email: 'test@test.vn' });
          toast.success("Đăng ký thành công, vui lòng đăng nhập", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleVerify = (value: any) => {
    const pinCode = `${value.pin_1}${value.pin_2}${value.pin_3}${value.pin_4}${value.pin_5}${value.pin_6}`;
    console.log(pinCode);

    axios
      .post(`${BASE_API_URL}/auth/verify-otp`, {
        ...DataUser,
        otp: pinCode,
      })
      .then((response) => {
        if (response) {
          navigate("/auth/navigation");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  return (
    <SMain>
      <ModalDesignation
        isModal={modelVerify}
        setOpenModals={setShowModelVerify}
      >
        <div className="container height-100 d-flex justify-content-center align-items-center">
          <div className="position-relative">
            <div className="card p-2 text-center">
              <h4>
                Vui lòng nhập mật khẩu một lần để xác minh tài khoản của bạn
              </h4>
              <div>
                {" "}
                <span>
                  Mã sẽ được gửi đến số điện thoại mà bạn đăng kí
                </span>{" "}
              </div>
              <div
                id="otp"
                className="inputs d-flex flex-row justify-content-center mt-2"
              >
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{
                    paddingRight: "20%",
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    padding: "16px 0 32px",
                  }}
                  initialValues={{ remember: true }}
                  onFinish={handleVerify}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item name="pin_1">
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="first"
                      maxLength={1}
                    />
                  </Form.Item>
                  <Form.Item name="pin_2">
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="second"
                      maxLength={1}
                    />
                  </Form.Item>
                  <Form.Item name="pin_3">
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="third"
                      maxLength={1}
                    />
                  </Form.Item>
                  <Form.Item name="pin_4">
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="fourth"
                      maxLength={1}
                    />
                  </Form.Item>
                  <Form.Item name="pin_5">
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="fifth"
                      maxLength={1}
                    />
                  </Form.Item>
                  <Form.Item name="pin_6">
                    <input
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="sixth"
                      maxLength={1}
                    />
                  </Form.Item>
                  <button
                    style={{
                      display: "block",
                      position: "absolute",
                      bottom: "8px",
                    }}
                    className="btn btn-danger px-4 validate"
                  >
                    Nhập
                  </button>{" "}
                </Form>
              </div>
            </div>
            <div className="card-2">
              <div className="content d-flex justify-content-center align-items-center">
                {" "}
                <span>Không nhận được mã</span>{" "}
                <a href="#" className="text-decoration-none ms-3">
                  {" "}
                  Gửi lại
                </a>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        </div>
      </ModalDesignation>
      <SModal>
        <SLogo>
          <img src={images.logoSm} alt="MiHealthCare Logo" />
        </SLogo>
        <STitle>Đăng ký sử dụng dịch vụ</STitle>
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
            rules={[
              { required: true, message: "Vui lòng nhập vào email của bạn" },
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
                message: "Vui lòng nhập vào của bạn",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập vào mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Tên trung tâm"
            name="merchantName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào tên trung tâm của bạn",
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
                message: "Vui lòng nhập vào số điện thoại của trung tâm",
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
                message: "Vui lòng nhập vào địa chỉ của trung tâm",
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
                message: "Vui lòng nhập vào subdomain của trung tâm",
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
