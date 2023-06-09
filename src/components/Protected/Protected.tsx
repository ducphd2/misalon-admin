/* eslint-disable max-len */
import classNames from 'classnames/bind';
import { Suspense, lazy, useEffect, useState } from 'react';
import { withCookies } from 'react-cookie';
import { Navigate, Route, Routes } from 'react-router-dom';
import Booking from '../../pages/Booking/Booking';
import BookingPayment from '../../pages/BookingPayment/BookingPayment';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Service from '../../pages/Service/Service';
import Schedule from '../../pages/Shedule/Schedule';
import UserManagement from '../../pages/UserManagement/UserManagement';
import styles from './Protected.module.scss';
import ChangPassword from '../../pages/Authen/ChangePassword';
const Chat = lazy(() => import('../../pages/Chat'));
const Header = lazy(() => import('../Header'));
const Sidebar = lazy(() => import('../Sidebar'));
const Branch = lazy(() => import('../../pages/Branch'));
const ProfilePage = lazy(() => import("../../pages/profile"));

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

const Protected = (props: any) => {
  const cx = classNames.bind(styles);
  const [openOnClick, setOpenOnClick] = useState(true);
  const [menuActive, setMenuActive] = useState(true);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // useEffect(() => {
  //   windowSize.innerWidth < 1400 && setMenuActive(() => false);
  // }, [windowSize]);

  const onClickCloseMobile = () => {
    setMenuActive(!false);
  };

  const handleMenuClick = () => {
    setMenuActive(!menuActive);
    setOpenOnClick(!openOnClick);
  };

  const menu = [
    {
      path: '/',
      component: <Dashboard />,
      isAdmin: false,
    },
    {
      path: 'dashboard',
      component: <Dashboard />,
      isAdmin: false,
    },
    {
      path: 'chat',
      component: <Chat />,
      isAdmin: false,
    },
    {
      path: 'branch',
      component: <Branch />,
      isAdmin: false,
    },
    {
      path: 'service',
      component: <Service />,
      isAdmin: false,
    },
    {
      path: 'booking',
      component: <Booking />,
      isAdmin: false,
    },
    {
      path: 'schedule',
      component: <Schedule />,
      isAdmin: false,
    },
    {
      path: 'user-management',
      component: <UserManagement />,
      isAdmin: false,
    },
    {
      path: 'booking-payment/:id',
      component: <BookingPayment />,
      isAdmin: false,
    },
    {
      path: '/employee-profile',
      component: <ProfilePage />,
      isAdmin: false,
    },
  ];
  return (
    <div className={cx('wrapper')}>
      {/* {menuActive && <Sidebar menuActive={menuActive} onMenuClick={handleMenuClick} />} */}
      <Sidebar
        openOnClick={openOnClick}
        menuActive={menuActive}
        onMenuClick={handleMenuClick}
        setMenuActive={setMenuActive}
      />
      <div className={cx('app', menuActive ? '' : 'sm-margin')}>
        <Header onMenuClick={handleMenuClick} menuActive={menuActive} />
        <Routes>
          {menu.map((element, index) => (
            <Route
              path={`/${element.path}`}
              element={
                <Suspense fallback={<></>}>
                  {!element.isAdmin ? (
                    element.component
                  ) : (
                    <Navigate to="/employee-profiles" />
                  )}
                </Suspense>
              }
              key={String(element.path)}
            />
          ))}
          <Route
            path="/change-password"
            element={
              <Suspense fallback={<></>}>
                <ChangPassword />
              </Suspense>
            }
          />
          {/* <Route path="/404" element={<PageNotFound />}></Route> */}
        </Routes>
      </div>
    </div>
  );
};

export default withCookies(Protected);
