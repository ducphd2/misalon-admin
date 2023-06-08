import classNames from "classnames/bind";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import images from "../../../assets/images";
import { useAppDispatch } from "../../../redux/hooks";
import {
  getLoginUser,
  selectAccessToken,
} from "../../../redux/slice/Authen/login";
import { IChangePassword, ILoginData } from "../../../redux/types/Login/login";
import styles from "./ChangPassword.module.scss";
import { selectAuthUser } from "../../../redux/slice/Authen/login";
import MainLayout from "../../../components/MainLayout/MainLayout";
import { httpService } from "../../../redux/service/httpService";
import changePassword from "../../../redux/service/Authen/change-password";

const Button = lazy(() => import("../../../components/Button"));
const Input = lazy(() => import("../../../components/Input"));

const ChangPassword: React.FC = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IChangePassword>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useAppDispatch();
  const userLogin: any = useSelector(selectAuthUser);

  const [errors, setErrors] = useState({
    type: "",
    error: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { validateEmail, validatePassword } = await import(
      "../../../common/utils"
    );

    if (formData.currentPassword === "") {
      setErrors({ type: "currentPassword", error: "This field is required" });
    }
    // else if (!validatePassword(formData.password)) {
    //   setErrors({ type: "password", error: "Invalid password" });
    // }
    else {
      setErrors({ type: "", error: "" });
      const req = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      };
      try {
        const res = await changePassword.change(req);
        if (res?.statusCode === 201) {
          toast.success("Thay đổi mật khẩu thành công", {
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
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        throw error;
      }

      // dispatch(getLoginUser(req));
    }
  };

  // useEffect(() => {
  //   if (userLogin) {
  //     if (userLogin.role === 0) {
  //       navigate("/");
  //     } else if (userLogin.role != "") navigate("/dashboard");
  //   }
  // }, [userLogin]);

  return (
    <div className={cx("account-page")}>
      <div className={cx("account-wrapper")}>
        <div className={cx("account-box")}>
          <div className={cx("account-container")}>
            <div className={cx("account-content")}>
              <div className={cx("content-inside")}>
                <h3 className={cx("account-title")}>Thay đổi mật khẩu</h3>
                <form onSubmit={handleSubmit}>
                  <div className={cx("label")}>
                    <Suspense fallback={<></>}>
                      <Input
                        label="Mật khẩu cũ"
                        type="password"
                        name="currentPassword"
                        errorMessage={
                          errors.type === "password" ? errors.error : ""
                        }
                        invalid
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        maxWidth="100%"
                      />
                    </Suspense>
                  </div>

                  <div className={cx("label")}>
                    <Suspense fallback={<></>}>
                      <Input
                        label="Mật khẩu mới"
                        type="password"
                        name="newPassword"
                        errorMessage={
                          errors.type === "password" ? errors.error : ""
                        }
                        invalid
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        maxWidth="100%"
                      />
                    </Suspense>
                  </div>
                  <div className={cx("label")}>
                    <Suspense fallback={<></>}>
                      <Input
                        label="Nhập lại mật khẩu mới"
                        type="password"
                        name="confirmPassword"
                        errorMessage={
                          errors.type === "password" ? errors.error : ""
                        }
                        invalid
                        value={formData.confirmPassword}
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangPassword;
