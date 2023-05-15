import classNames from "classnames/bind";
import { Dispatch, lazy, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CloseIcon,
  DashboardIcon,
  EmployeeIcon,
  LogoutIcon,
} from "../../assets/icons/SidebarIcons";
import images from "../../assets/images";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faRocket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
export type TSidebarProps = {
  setMenuActive: Dispatch<SetStateAction<boolean>>;
  onMenuClick: () => void;
  openOnClick: boolean;
  menuActive: boolean;
};
const MenuItem = lazy(() => import("./MenuItem/MenuItem"));

const cx = classNames.bind(styles);
interface MenuItem {
  icon?: JSX.Element;
  label: string;
  to: string;
  children?: MenuItem[];
  topDevider?: boolean;
  id?: number;
  isAdmin?: boolean;
}

const menuItem: MenuItem[] = [
  {
    icon: <DashboardIcon className={''} />,
    label: 'Dashboard',
    to: '/dashboard',
    id: 1,
    // isAdmin: true,
  },
  {
    icon: <EmployeeIcon />,
    label: 'Dịch vụ',
    to: '/',
    id: 2,
    children: [
      {
        label: 'Chi nhánh',
        to: '/branch',
        topDevider: false,
        // isAdmin: true,
      },
      {
        label: 'Nhóm dịch vụ',
        to: '/service-group',
        topDevider: false,
        // isAdmin: true,
      },
      {
        label: 'Dịch vụ',
        to: '/service',
        topDevider: false,
        // isAdmin: true,
      },
    ],
  },
  {
    icon: <DashboardIcon className={''} />,
    label: 'Booking',
    to: '/booking',
    id: 1,
    // isAdmin: true,
  },
  {
    icon: <DashboardIcon className={''} />,
    label: 'Schedule',
    to: '/schedule',
    id: 1,
    // isAdmin: true,
  },
  {
    icon: <EmployeeIcon />,
    label: 'Profile',
    to: '/',
    id: 3,
    children: [
      {
        label: 'Profile',
        to: '/profile',
        topDevider: false,
      },
    ],
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
    icon: (
      <FontAwesomeIcon
        icon={faUserPlus}
        style={{ color: '#b7c0cd', width: '24px', height: '24px' }}
      />
    ),
    label: 'User Management',
    to: '/user-management',
    id: 6,
  },
  {
    icon: (
      <FontAwesomeIcon
        icon={faGear}
        style={{ color: '#b7c0cd', width: '24px', height: '24px' }}
      />
    ),
    label: 'Setting',
    to: '/',
    id: 7,
    children: [
      {
        label: 'Change PassWord',
        to: '/change-password',
        topDevider: false,
      },
      {
        label: 'Languages',
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
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize.innerWidth < 991.98) {
      setMenuActive(() => false);
    }
  }, [windowSize]);

  return (
    <div className={cx(menuActive && "modal")} onClick={onMenuClick}>
      <section
        className={cx("wrapper", menuActive && "active")}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => !openOnClick && setMenuActive(() => true)}
        onMouseLeave={() => !openOnClick && setMenuActive(() => false)}
      >
        <Link to="/">
          <div className={cx("logo-wrapper")}>
            <img src={images.logoSm} alt="" className={cx("logo", "logo-sm")} />
          </div>
        </Link>
        <div className={cx("menu")}>
          <MenuItem
            menuItem={menuItem}
            menuActive={menuActive}
            open={open}
            onSetOpen={onSetOpen}
            setMenuMobile={setMenuActive}
          />
        </div>
        {menuActive && (
          <div className={cx("close-icon")} onClick={onMenuClick}>
            <CloseIcon className={""} />
          </div>
        )}
      </section>
    </div>
  );
}
