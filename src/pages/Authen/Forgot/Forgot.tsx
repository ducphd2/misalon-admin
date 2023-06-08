import classNames from "classnames/bind";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import images from "../../../assets/images";
import { useAppDispatch } from "../../../redux/hooks";

import styles from "./Forgot.module.scss";
import { selectAuthUser } from "../../../redux/slice/Authen/login";
import changePassword from "../../../redux/service/Authen/change-password";
import { toast } from "react-toastify";

const Button = lazy(() => import("../../../components/Button"));
const Input = lazy(() => import("../../../components/Input"));

export interface IForgotData {
    email: string;
  }

const Forgot: React.FC = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IForgotData>({
    email: ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const [errors, setErrors] = useState({
    type: "",
    error: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.email === "") {
      setErrors({ type: "username", error: "Invalid user name address" });
    }
    else {
      setErrors({ type: "", error: "" });
      const req = {
        email: formData.email,
        baseUrl: "http://localhost:3000" 
      };
      try {
        const res = await changePassword.forgot(req);
        if (res?.statusCode === 201) {
          toast.success(res?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setFormData({
            email: "",
          });
        }
      } catch (error) {
        throw error;
      }
      
    //   dispatch(getLoginUser(req));
    }
  };

//   useEffect(() => {
//     if (userLogin) {
//       if (userLogin.role === 0) {
//         navigate("/");
//       } else if (userLogin.role != "") navigate("/dashboard");
//     }
//   }, [userLogin]);

  return (
    <div className={cx("account-page")}>
      <div className={cx("account-wrapper")}>
        <div className={cx("account-image")}>

        </div>
        <div className={cx("account-box")}>
          <div className={cx("account-container")}>
            <div className={cx("account-logo")}>
              <img src={images.logoSm} alt="Aht Logo" className={cx("logo")} />
            </div>
            <div className={cx("account-content")}>
              <div className={cx("content-inside")}>
                <h3 className={cx("account-title")}>Quên mật khẩu</h3>
                <p className={cx("account-subtitle")}>
                  Nhập email của bạn để lấy mật khẩu mới
                </p>
                <form onSubmit={handleSubmit}>
                  <div className={cx("label")}>
                    <Suspense fallback={<></>}>
                      <Input
                        label="Email Address *"
                        type="text"
                        name="email"
                        errorMessage={
                          errors.type === "email" ? errors.error : ""
                        }
                        invalid
                        value={formData.email}
                        onChange={handleInputChange}
                        maxWidth="100%"
                      />
                    </Suspense>
                  </div>
                  <Suspense fallback={<></>}>
                    <Button
                      type="submit"
                      label="Xác nhận"
                      classType={cx("btn-submit")}
                      maxWidth="100%"
                    />
                  </Suspense>
                  <Link to={"/auth/signup"} className={cx("sign-up")}>
                    Bạn chưa có tài khoản, đăng ký ngay
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
