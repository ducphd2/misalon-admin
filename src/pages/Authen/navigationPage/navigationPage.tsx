import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { CheckIcon } from '../../../assets/Icons';

export const NavigationPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  console.log({ searchParams: searchParams.get('subDomain') });

  return (
    <NavigationPageStyled>
      <div className="container">
        <CheckIcon />
        <div className="description">
          Chúc mừng! Bạn đã tạo tài khoản thành công, xin mời bấm vào đây để
          đăng nhập vào hệ thống và sử dụng.
        </div>
        <Link
          to={
            // process.env.REACT_APP_DOMAIN
            //   ? `https://${searchParams.get('subDomain')}.${
            //       process.env.REACT_APP_DOMAIN
            //     }`
            //   : `ducph.info`
            '/auth/login'
          }
          className="button-navigate navigate-domain"
        >
          {/* https://{searchParams.get('subDomain')}.{process.env.REACT_APP_DOMAIN} */}
        </Link>

        <Link
          to={
            // process.env.REACT_APP_DOMAIN
            //   ? `https://${searchParams.get('subDomain')}.${
            //       process.env.REACT_APP_DOMAIN
            //     }/auth/sign-in`
            //   : '/auth/sign-in'
            '/auth/login'
          }
        >
          <button type="button" className="btn btn-primary btn-lg">
            Đăng nhập
          </button>
        </Link>

        <Link
          to={'/auth/forgot-password'}
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
