import classNames from "classnames/bind";
import images from "../../assets/images";
import styles from "./Header.module.scss";
import {
  faEllipsisV,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import {
  HideMenuIcon,
  ShowMenuIcon,
  UserIcon,
} from "../../assets/icons/HeaderIcons";
import DropMenu from "./DropdownMenu/DropMenu";
import MenuItem from "./MenuItem";
import useClickOutside from "../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  resetAuthUserState,
  selectAuthUser,
  logout
} from "../../redux/slice/Authen/login";
import { AuthUser } from "../../redux/types/Login/login";

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
  const dispatch = useAppDispatch()
  const [authUser, setAuthUser] = useState<any>({
    createdAt: "",
    email: "",
    employee: null,
    resetPasswordToken: "",
    role: "",
    updatedAt: "",
    username: "",
    __v: 0,
    _id: "",
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
    if(textSearch !== "") {
      navigate(`/search?search=${textSearch}`);
      setTextSearch("")
    }
    // console.log("Submit !");
  };

  const listMenu = [
    { name: "My Profile", path: "/employee-profile" },
    { name: "Setting", path: "/setting" },
    { name: "Logout", path: "/auth/login" },
  ];
  const listLanguage = [
    { id: 0, name: "Vietnameses" },
    { id: 1, name: "China" },
  ];

  const routes = ["/change-password", "/profile", "/preferences"];

  const navigate = useNavigate();
  const handleItemClick = (path: string) => {
    const firstRoute = routes[0];
    if (path === "/setting") {
      navigate(firstRoute);
    } else if(path === "/auth/login") {
      navigate(path);
      dispatch(logout())
    }else {
      navigate(path);
    }
  };

  return (
    <header
      className={cx("wrapper", `${menuActive ? "menuOpen" : "menuClose"}`)}
    >
      {menuActive ? (
        <div className={cx("hide-menu")} onClick={onMenuClick}>
          <HideMenuIcon className={cx("hide-menu-icon")} />
          <span className={cx("hide-menu-text")}>HEALTH</span>
        </div>
      ) : (
        <div className={cx("hide-menu")} onClick={onMenuClick}>
          <ShowMenuIcon className={cx("show-menu-icon")} />
          <span className={cx("hide-menu-text")}>HEALTH</span>
        </div>
      )}

      <div className={cx("logo-header")}>
        <img className={cx("logo-mobile")} src={images.logoSm} alt="" />
      </div>
      <div className={cx("user-menu")}>
        <MenuItem noHover>
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
        </MenuItem>
        <MenuItem
          hasArrow
          isOpen={isOpenLanguage}
          setOpenMenu={setOpenLanguage}
        >
          <div className={cx("language")}>
            <div>English</div>
            <DropMenu
              isOpen={isOpenLanguage}
              listItem={listLanguage}
              label="name"
            />
          </div>
        </MenuItem>
        <MenuItem hasArrow isOpen={isOpenMenu} setOpenMenu={setOpenMenu}>
          <div className={cx("user")}>
            <UserIcon className={cx("user-ava")} />
            <div className={cx("username")}>
              <p className={cx("name")}>{authUser?.username}</p>
              <span className={cx("role")}>{authUser?.role}</span>
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
              placeholder="Search here"
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
