import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { CheckIcon } from "../../../assets/Icons";

export const NavigationPage = () => {
  const navigate = useNavigate();

  return (
    <NavigationPageStyled>
      <div className="container">
        <CheckIcon />
        <div className="description">
          Chúc mừng! Bạn đã tạo tài khoản thành công, xin mời bấm vào tên miền
          dưới đây để đăng nhập vào hệ thống và sử dụng.
        </div>
        <Link
          to={"/auth/forgot-password"}
          className="button-navigate navigate-domain"
        >
          https://huyenciu5.salonhero.vn
        </Link>

        <button
          onClick={() => navigate("/auth/sign-in")}
          type="button"
          className="btn btn-primary btn-lg"
        >
          Đăng nhập
        </button>

        <Link
          to={"/auth/forgot-password"}
          className="button-navigate navigate-home"
        >
          Quay về trang chủ
        </Link>
      </div>
    </NavigationPageStyled>
  );
};

const NavigationPageStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .description {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
  }
  .container {
    width: 860px;
    margin: auto;
    background-color: white;
    padding: 30px 0px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 32px 60px;
  }
  .navigate-domain {
    color: #f32843 !important;
    font-size: 16px;
  }
  .button-navigate {
    display: block;
  }
  .navigate-home {
    font-weight: 500;
    color: #00000073 !important;
  }
`;

export default NavigationPage;
