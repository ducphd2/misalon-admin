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
import ModalDesignation from "../Modal";

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
  const [infoUser, setInfoUser] = useState<any>();
  const [infoShop, setInfoShop] = useState<any>();
  const [openModal, setOpenModal] = useState<any>(false);

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
    { name: "Thông tin cá nhân",path: false},
    { name: "Cài đặt", path: "/setting" },
    { name: "Đăng xuất", path: "/auth/login" },
  ];


  const routes = ["/change-password", "/profile", "/preferences"];

  const navigate = useNavigate();
  const handleItemClick = (path: string) => {
    const firstRoute = routes[0];
    if(path){
      if ( path === "/setting") {
        navigate(firstRoute);
      } else if (path === "/auth/login") {
        navigate(path);
        dispatch(logout());
      } else {
        navigate(path);
      }
      return;
    }
    setOpenModal(true);
  };

  // const handleConvertArray = ()=>{
  // }
  useEffect(()=>{
    const array = JSON.parse((localStorage as any).getItem('persist:root'))?.auth && JSON.parse?.(JSON.parse((localStorage as any).getItem('persist:root'))?.auth)?.userInfo
    const arrayCart = (localStorage as any).getItem('merchant') && JSON.parse?.((localStorage as any).getItem('merchant'))

    console.log('arrayCart',arrayCart)
    setInfoShop(arrayCart)
    setInfoUser(array)
  },[])



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
        <ModalDesignation title="Chi tiết tài khoản" isModal={openModal} setOpenModals={setOpenModal} >
            <div style={{display:'flex',gap:'24px'}} >
              <div>Tên:</div>
              <div>{infoUser?.fullName || '?'}</div>
            </div>
            <div style={{display:'flex',gap:'24px'}} >
              <div>Email:</div>
              <div>{infoUser?.email || '?'}</div>
            </div>
            <div style={{display:'flex',gap:'24px'}} >
              <div>Giới tính:</div>
              <div>{infoUser?.gender || '?'}</div>
            </div>
            <div style={{display:'flex',gap:'24px'}} >
              <div>SDT:</div>
              <div>{infoUser?.phoneNumber || '?'}</div>
            </div>
            <div style={{display:'flex',gap:'24px'}} >
              <div>Vai trò:</div>
              <div>{infoUser?.role || '?'}</div>
            </div>
            <div style={{display:'flex',gap:'24px',borderBottom:'1px solid black'}} >
              <div>Địa chỉ:</div>
              <div>{infoUser?.address || '?'}</div>
            </div>
            <div style={{display:'flex',gap:'24px',marginTop:'16px'}} >
              <h4>Cửa hàng:</h4>
            </div>
            <div style={{display:'flex',gap:'24px'}} >
              <div>Tên:</div>
              <div>{infoShop?.name || '?'}</div>
            </div>
            <div style={{display:'flex',gap:'24px'}} >
              <div>Địa chỉ:</div>
              <div>{infoShop?.address || '?'}</div>
            </div>
            <div style={{display:'flex',gap:'24px'}} >
              <div>SDT:</div>
              <div>{infoShop?.phone || '?'}</div>
            </div>
          </ModalDesignation>

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
