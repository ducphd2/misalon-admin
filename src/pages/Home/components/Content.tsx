import React from 'react';
import Styles from './style.module.scss';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';
import { FcEngineering } from 'react-icons/fc';
import Job from '../../../assets/images/job-profile.png';

function ContentHome() {
  return (
    <div className={Styles.wrapperMain}>
      <div className="flex row justify-content-between align-items-center">
        <div className={Styles.bookingLeft}>
          <h1>Tìm kiếm dịch vụ và đặt lịch ngay</h1>
          <p className={Styles.textFooter}>
            Sắp xếp lịch hẹn - Quản lý doanh thu sổ sách Chăm sóc khách hàng -
            Tính hoa hồng nhân viên
          </p>
          <div className={Styles.desBooking}>
            {' '}
            <span>Từ khóa nổi bật: </span>Chăm sóc sức khỏe chủ động,Spa,Dinh
            dưỡng
          </div>
        </div>
        <div className={Styles.bookingRight}>
          <img src={Job} alt="" />
          <div
            className={`${Styles.itemBooking}` + ' ' + Styles.itemCenter}
            style={{
              top: '50px',
              left: '-100px',
            }}
          >
            <FcEngineering style={{ marginRight: '10px' }} />
            Đặt lịch ngay
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentHome;
