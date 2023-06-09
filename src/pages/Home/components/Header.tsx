import React, { useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Styles from "./style.module.scss";
import Logo from "../../../assets/images/logo.png";
import { logout, selectAuthUser } from "../../../redux/slice/Authen/login";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

function HeaderHome() {
  const navigate = useNavigate();
  const userLogin: any = useAppSelector(selectAuthUser);
  const isLogin = !!userLogin && userLogin?.role !== "";
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login')
  };

  useEffect(()=>{
    if (userLogin) {
      if (userLogin.role === 1) {
        navigate("/dashboard");
      }
    }
  },[userLogin])
  return (
    <div style={{ height: "72px", width: "100%", padding: "20px 5%" }}>
      <div className={Styles.flexCenterBetween}>
        <div className={Styles.logo}>
          <img src={Logo} alt="" />
        </div>
        <div className={Styles.flexCenterBetween}>
          <div className={Styles.navLink}>Trung tâm CSSK</div>
          <div className={Styles.navLink}>Lịch hẹn</div>
          <div className={Styles.navLink}>Hệ thống dịch vụ</div>
          <div className={Styles.navLink}>Chi nhánh</div>
        </div>
        <div className={`${Styles.btn}` + " " + `${Styles.flexCenterBetween}`}>
          <button
            onClick={() => {
              !isLogin ? navigate("/auth/login") : handleLogout();
            }}
          >
            <FiUser style={{ marginBottom: "3px", marginRight: "5px" }} />
            {!isLogin ? " Đăng nhập" : "Đăng xuất"}
          </button>
          <button
            onClick={() => {
              navigate("/auth/signup");
            }}
          >
            {" "}
            <FiUser style={{ marginBottom: "3px", marginRight: "5px" }} />
            Trở thành cửa hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderHome;
