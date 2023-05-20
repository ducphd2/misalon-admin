import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Dispatch, lazy, SetStateAction, useEffect, useState } from 'react';
import {
  AiFillSetting,
  AiFillWechat,
  AiOutlineBranches,
  AiOutlineCalendar,
} from 'react-icons/ai';
import {
  MdDashboard,
  MdManageAccounts,
  MdOutlineHealthAndSafety,
  MdOutlineMiscellaneousServices,
  MdOutlineMonetizationOn,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { CloseIcon } from '../../assets/icons/SidebarIcons';
import styles from './Sidebar.module.scss';
export type TSidebarProps = {
  setMenuActive: Dispatch<SetStateAction<boolean>>;
  onMenuClick: () => void;
  openOnClick: boolean;
  menuActive: boolean;
};
const MenuItem = lazy(() => import('./MenuItem/MenuItem'));

const cx = classNames.bind(styles);
interface SidebarMenuItem {
  icon?: JSX.Element;
  label: string;
  to: string;
  children?: SidebarMenuItem[];
  topDevider?: boolean;
  id?: number;
  isAdmin?: boolean;
}

const menuItem: SidebarMenuItem[] = [
  {
    icon: <MdDashboard />,
    label: 'Tổng quan',
    to: '/dashboard',
    id: 1,
    // isAdmin: true,
  },
  {
    icon: <MdOutlineMiscellaneousServices />,
    label: 'Quản lý dịch vụ',
    to: '/service',
    id: 2,
  },
  {
    icon: <AiOutlineBranches />,
    label: 'Quản lý chi nhánh',
    to: '/branch',
    id: 8,
  },
  {
    icon: <AiFillWechat />,
    label: 'Nhắn tin',
    to: '/chat',
    id: 10,
  },
  {
    icon: <MdOutlineMonetizationOn />,
    label: 'Quản lý lịch hẹn',
    to: '/booking',
    id: 1,
    // isAdmin: true,
  },
  {
    icon: <AiOutlineCalendar />,
    label: 'Schedule',
    to: '/schedule',
    id: 1,
    // isAdmin: true,
  },
  {
    icon: <FontAwesomeIcon icon={faRocket} style={{ height: 24, width: 24 }} />,
    label: 'Projects',
    to: '/',
    id: 4,
    isAdmin: true,
    children: [
      {
        label: 'Projects',
        to: '/projects',
        topDevider: false,
      },
    ],
  },
  {
    icon: <MdManageAccounts />,
    label: 'Quản lý nhân viên',
    to: '/user-management',
    id: 6,
  },
  {
    icon: <AiFillSetting />,
    label: 'Cài đặt',
    to: '/',
    id: 7,
    children: [
      {
        label: 'Thay đổi mật khẩu',
        to: '/change-password',
        topDevider: false,
      },
      {
        label: 'Đổi ngôn ngữ',
        to: '/languages',
        topDevider: false,
      },
    ],
  },
];
function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
export default function Sidebar({
  openOnClick,
  menuActive,
  onMenuClick,
  setMenuActive,
}: TSidebarProps) {
  const [open, setOpen] = useState(-1);

  const onSetOpen = (e: number) => {
    setOpen(e);
  };
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [isMobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    if (windowSize.innerWidth < 991.98) {
      setMenuActive(() => false);
    }
  }, [windowSize]);

  return (
    <div className={cx(menuActive && 'modal')} onClick={onMenuClick}>
      <section
        className={cx('wrapper', menuActive && 'active')}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => !openOnClick && setMenuActive(() => true)}
        onMouseLeave={() => !openOnClick && setMenuActive(() => false)}
      >
        <Link to="/">
          <div className={cx('logo-wrapper')}>
            <MdOutlineHealthAndSafety
              className={cx('logo', 'logo-sm')}
              size={55}
              color="#B7C0CD"
            />
            {/* <img src={images.logoSm} alt="" className={cx("logo", "logo-sm")} /> */}
          </div>
        </Link>
        <div className={cx('menu')}>
          <MenuItem
            menuItem={menuItem}
            menuActive={menuActive}
            open={open}
            onSetOpen={onSetOpen}
            setMenuMobile={setMenuActive}
          />
        </div>
        {menuActive && (
          <div className={cx('close-icon')} onClick={onMenuClick}>
            <CloseIcon className={''} />
          </div>
        )}
      </section>
    </div>
  );
}
