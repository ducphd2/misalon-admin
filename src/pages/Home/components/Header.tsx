import React from 'react';
import { FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Styles from './style.module.scss';
import Logo from '../../../assets/images/logo.png';

function HeaderHome() {
  const navigate = useNavigate();
  return (
    <div style={{ height: '72px', width: '100%', padding: '20px 5%' }}>
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
        <div className={`${Styles.btn}` + ' ' + `${Styles.flexCenterBetween}`}>
          <button
            onClick={() => {
              navigate('/auth/login');
            }}
          >
            <FiUser style={{ marginBottom: '3px', marginRight: '5px' }} />
            Đăng nhập
          </button>
          <button
            onClick={() => {
              // navigate("https://signup.mshopkeeper.vn/");
              window.location.href = 'https://signup.mshopkeeper.vn/';
            }}
          >
            {' '}
            <FiUser style={{ marginBottom: '3px', marginRight: '5px' }} />
            Trở thành cửa hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderHome;
