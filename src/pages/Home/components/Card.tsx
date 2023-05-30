import React from 'react';
import Job from '../../../assets/images/job-profile.png';
import Styles from './style.module.scss';

function CardHome() {
  return (
    <>
      <div className={Styles.wrapperMain}>
        <div className={Styles.titleWrapper}>
          Dịch vụ tuyệt vời, có nhiều chính sách ưu đãi cao với khách hàng mới.
        </div>
        <div className={Styles.listCard + ' ' + Styles.flexCenterBetween}>
          <div className={Styles.card}>
            <img
              src="https://c4.wallpaperflare.com/wallpaper/892/692/922/howl-s-moving-castle-studio-ghibli-fantasy-art-clouds-daylight-hd-wallpaper-preview.jpg"
              alt=""
            />
            <p className={Styles.desCard}>
              Uốn siêu cấp phục hồi Keratin Smooth
            </p>
            <p className={Styles.desCard}>120.000 VNĐ</p>
          </div>
          <div className={Styles.card}>
            <img
              src="https://c4.wallpaperflare.com/wallpaper/892/692/922/howl-s-moving-castle-studio-ghibli-fantasy-art-clouds-daylight-hd-wallpaper-preview.jpg"
              alt=""
            />
            <p className={Styles.desCard}>
              Uốn siêu cấp phục hồi Keratin Smooth
            </p>{' '}
            <p className={Styles.desCard}>120.000 VNĐ</p>
          </div>
          <div className={Styles.card}>
            <img
              src="https://c4.wallpaperflare.com/wallpaper/892/692/922/howl-s-moving-castle-studio-ghibli-fantasy-art-clouds-daylight-hd-wallpaper-preview.jpg"
              alt=""
            />
            <p className={Styles.desCard}>
              Uốn siêu cấp phục hồi Keratin Smooth
            </p>{' '}
            <p className={Styles.desCard}>120.000 VNĐ</p>
          </div>
          <div className={Styles.card}>
            <img
              src="https://c4.wallpaperflare.com/wallpaper/892/692/922/howl-s-moving-castle-studio-ghibli-fantasy-art-clouds-daylight-hd-wallpaper-preview.jpg"
              alt=""
            />
            <p className={Styles.desCard}>
              Uốn siêu cấp phục hồi Keratin Smooth
            </p>{' '}
            <p className={Styles.desCard}>120.000 VNĐ</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardHome;
