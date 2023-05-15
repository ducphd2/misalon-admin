import classNames from "classnames/bind";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import images from "../../../assets/images";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  getLoginUser,
  selectAuthUser,
  selectAccessToken,
} from "../../../redux/slice/Authen/login";
import { ILoginData } from "../../../redux/types/Login/login";
import styles from "./SignIn.module.scss";

const Button = lazy(() => import("../../../components/Button"));
const Input = lazy(() => import("../../../components/Input"));

const Login: React.FC = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ILoginData>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useAppDispatch();
  const userLogin = useSelector(selectAccessToken);

  const [errors, setErrors] = useState({
    type: "",
    error: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { validateEmail, validatePassword } = await import(
      "../../../common/utils"
    );

    if (formData.email === "") {
      setErrors({ type: "username", error: "Invalid user name address" });
    }
    // else if (!validatePassword(formData.password)) {
    //   setErrors({ type: "password", error: "Invalid password" });
    // }
    else {
      setErrors({ type: "", error: "" });
      const req = {
        email: formData.email,
        password: formData.password,
      };
      dispatch(getLoginUser(req));
    }
  };

  useEffect(() => {
    if (userLogin) {
      navigate("/");
    }
  }, [userLogin]);

  return (
    <div className={cx("account-page")}>
      <div className={cx("account-wrapper")}>
        <div className={cx("account-box")}>
          <div className={cx("account-container")}>
            <div className={cx("account-logo")}>
              <img src={images.logoSm} alt="Aht Logo" className={cx("logo")} />
            </div>
            <div className={cx("account-content")}>
              <div className={cx("content-inside")}>
                <h3 className={cx("account-title")}>Login</h3>
                <p className={cx("account-subtitle")}>
                  Access to our dashboard
                </p>
                <form onSubmit={handleSubmit}>
                  <div className={cx("label")}>
                    <Suspense fallback={<></>}>
                      <Input
                        label="Email Address"
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

                  <div className={cx("label")}>
                    <div className={cx("account-password")}>
                      <p>Password</p>
                      <Link
                        to={"/auth/forgot-password"}
                        className={cx("forgot-password")}
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Suspense fallback={<></>}>
                      <Input
                        type="password"
                        name="password"
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

                  <Suspense fallback={<></>}>
                    <Button
                      type="submit"
                      label="Login"
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

export default Login;
