import {
  faEllipsisV,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { AiOutlineBars, AiOutlineWechat } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "../../assets/icons/HeaderIcons";
import images from "../../assets/images";
import useClickOutside from "../../hooks/useClickOutside";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/slice/Authen/login";
import DropMenu from "./DropdownMenu/DropMenu";
import styles from "./Header.module.scss";
import MenuItem from "./MenuItem";
import { Image } from "antd";

const cx = classNames.bind(styles);
export type THeaderProps = {
  onMenuClick: () => void;
  menuActive: boolean;
};

export default function Header({ menuActive, onMenuClick }: THeaderProps) {
  const [isOpenSearch, setOpenSearch] = useState(false);
  const [isOpenLanguage, setOpenLanguage] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const dispatch = useAppDispatch();
  const [authUser, setAuthUser] = useState<any>({
    createdAt: "",
    email: "",
    employee: null,
    resetPasswordToken: "",
    role: "",
    updatedAt: "",
    username: "",
    avatar: "",
    fullName: "",
  });

  useEffect(() => {
    const storedAuthUser = JSON.parse(
      localStorage.getItem("authUser") || "null"
    );
    setAuthUser(storedAuthUser);
  }, []);

  const modalRef = useRef<any>();
  useClickOutside(modalRef, () => setOpenSearch(false));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textSearch !== "") {
      navigate(`/search?search=${textSearch}`);
      setTextSearch("");
    }
  };

  const listMenu = [
    { name: "Thông tin cá nhân", path: "/employee-profile" },
    { name: "Cài đặt", path: "/setting" },
    { name: "Đăng xuất", path: "/auth/login" },
  ];
  const listLanguage = [
    { id: 0, name: "Vietnameses" },
    { id: 1, name: "English" },
  ];

  const routes = ["/change-password", "/profile", "/preferences"];

  const navigate = useNavigate();
  const handleItemClick = (path: string) => {
    const firstRoute = routes[0];
    if (path === "/setting") {
      navigate(firstRoute);
    } else if (path === "/auth/login") {
      navigate(path);
      dispatch(logout());
    } else {
      navigate(path);
    }
  };

  return (
    <header
      className={cx("wrapper", `${menuActive ? "menuOpen" : "menuClose"}`)}
    >
      {menuActive ? (
        <div className={cx("hide-menu")} onClick={onMenuClick}>
          <AiOutlineBars />
          <span className={cx("hide-menu-text")}>HEALTH</span>
        </div>
      ) : (
        <div className={cx("hide-menu")} onClick={onMenuClick}>
          <AiOutlineBars />
          <span className={cx("hide-menu-text")}>HEALTH</span>
        </div>
      )}

      <div className={cx("logo-header")}>
        <img className={cx("logo-mobile")} src={images.logoSm} alt="" />
      </div>
      <div className={cx("user-menu")}>
        {/* <MenuItem noHover>
          <button
            className={cx("search-btn-tablet")}
            onClick={() => setOpenSearch(!isOpenSearch)}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <div className={cx("top-nav-search")}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={textSearch}
                onChange={handleInputChange}
                className={cx("form-control")}
                placeholder="Search here"
              />
              <button type="submit" className={cx("search-btn")}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>
        </MenuItem> */}

        <div className={cx("language")} style={{ marginRight: "20px" }}>
          {/* <AiOutlineWechat size={25} color="rgb(146, 147, 148)" /> */}
          <IoMdNotificationsOutline size={25} color="rgb(146, 147, 148)" />
          {/* <MdLanguage size={25} color="rgb(146, 147, 148)" /> */}
        </div>
        <MenuItem hasArrow isOpen={isOpenMenu} setOpenMenu={setOpenMenu}>
          <div className={cx("user")}>
            <div style={{ marginRight: "10px" }}>
              {authUser.avatar ? (
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border : '1px solid #ccc'
                  }}
                >
                  <Image
                    src={authUser.avatar}
                    alt="avatar"
                    style={{ width: "100%", height: "100%" }}
                    preview={false}
                  />
                </div>
              ) : (
                <UserIcon className={cx("user-ava")} />
              )}
            </div>
            <div className={cx("username")}>
              <p className={cx("name")}>{authUser?.fullName}</p>
              <p style={{ marginBottom : 0, color : '#999'}}>Xin chào !</p>
              {/* <span className={cx("role")}>{authUser?.role}</span> */}
            </div>
            <DropMenu
              isOpen={isOpenMenu}
              listItem={listMenu}
              label="name"
              link="path"
              onItemClick={handleItemClick}
            />
          </div>
        </MenuItem>
      </div>

      <div className={cx("menu-mobile")}>
        <button
          className={cx("btn-mobile")}
          onClick={() => setOpenMenu(!isOpenMenu)}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
        <DropMenu
          isOpen={isOpenMenu}
          listItem={listMenu}
          label="name"
          link="path"
          onItemClick={handleItemClick}
        />
      </div>
      {isOpenSearch ? (
        <div className={cx("search-tablet-nav")} ref={modalRef}>
          <form onSubmit={handleSubmit}>
            <input
              value={textSearch}
              placeholder="Tìm kiếm..."
              onChange={handleInputChange}
              className={cx("search-tablet-input")}
            />
            <button className={cx("btn-search-tablet")} type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}
