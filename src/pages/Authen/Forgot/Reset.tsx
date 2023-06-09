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

export interface IResetData {
  password: string;
  confirm_password: string;
}

const Reset: React.FC = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IResetData>({
    password: "",
    confirm_password: "",
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

    const { validatePassword } = await import("../../../common/utils");

    if (formData.password === "") {
      setErrors({ type: "password", error: "Invalid user name address" });
    } else if (!validatePassword(formData.password)) {
      setErrors({ type: "password", error: "Invalid new password" });
    }  else if (formData.confirm_password !== formData.password) {
      setErrors({ type: "confirm", error: "Passwords are not the same" });
    } else {
      setErrors({ type: "", error: "" });
      const req = {
        password: formData.password,
        baseUrl: "http://localhost:3000",
      };
      try {
        //Handle call API
        // const res = await changePassword.forgot(req);
        // if (res?.statusCode === 201) {
        //   toast.success(res?.message, {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //   });
        //   setFormData({
        //     password: "",
        //   });
        // }
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
        <div className={cx("account-image")}></div>
        <div className={cx("account-box")}>
          <div className={cx("account-container")}>
            <div className={cx("account-logo")}>
              <img src={images.logoSm} alt="Aht Logo" className={cx("logo")} />
            </div>
            <div className={cx("account-content")}>
              <div className={cx("content-inside")}>
                <h3 className={cx("account-title")}>Quên mật khẩu</h3>
                <p className={cx("account-subtitle")}>
                   Nhập lại mật khẩu mới
                </p>
                <form onSubmit={handleSubmit}>
                  <div className={cx("label")}>
                    <Suspense fallback={<></>}>
                      <Input
                        type="password"
                        name="password"
                        label="Mật khẩu mới"
                        errorMessage={
                          errors.type === "password" ? errors.error : ""
                        }
                        invalid
                        value={formData.password}
                        onChange={handleInputChange}
                        maxWidth="100%"
                      />
                    </Suspense>
                  </div>
                  <div className={cx("label")}>
                    <Suspense fallback={<></>}>
                      <Input
                        type="password"
                        name="confirm"
                        label="Nhập lại mật khẩu"
                        errorMessage={
                          errors.type === "confirm" ? errors.error : ""
                        }
                        invalid
                        value={formData.confirm_password}
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

export default Reset;
