import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { ChevronRight } from "../../../assets/icons/SidebarIcons";
import styles from "../Sidebar.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const cx = classNames.bind(styles);
interface MenuItem {
  icon?: JSX.Element;
  label: string;
  to: string;
  children?: MenuItem[];
  topDevider?: boolean;
  id?: number;
  className?: string;
  isShowed?: boolean;
  isAdmin?: boolean
}

interface MenuProps {
  menuItem: MenuItem[];
  menuActive: boolean;
  open?: number;
  onSetOpen?: (e: number) => void;
  setMenuMobile?: Dispatch<SetStateAction<boolean>>;
  className?: string;
  isShowed?: boolean;
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

const MenuItem: React.FC<MenuProps> = ({
  menuItem,
  menuActive,
  open,
  onSetOpen,
  setMenuMobile,
  className,
  isShowed,
}) => {
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
      setMobileSidebar(() => true);
    } else {
      setMobileSidebar(() => false);
    }
  }, [windowSize]);
  const { role } = JSON.parse(
    localStorage.getItem("authUser") as any
  );

  return (
    <ul className={cx(className, isShowed && "show")}>
      {menuItem.map((item, index) => {
        if (!item.isAdmin) {
          return (<li key={index}>
            {item.children ? (
              <div
                className={cx("icon-container", {
                  parentActive: open === item.id,
                  "top-devider": item.topDevider,
                })}
                onClick={() => {
                  onSetOpen &&
                    (open === item.id ? onSetOpen(-1) : onSetOpen(item.id || -1));
                }}
              >
                <div
                  className={cx("icon")}
                  style={
                    menuActive ? { marginRight: "15px" } : { margin: "0 15px" }
                  }
                >
                  {item.icon}
                </div>
                {menuActive && <div className={cx("label")}>{item.label}</div>}
                {item.children && item.children.length > 0 && menuActive && (
                  <div
                    className={cx(
                      "icon",
                      "icon-end",
                      open === item.id ? "icon-open" : "icon-close"
                    )}
                  >
                    <ChevronRight />
                  </div>
                )}
              </div>
            ) : (
              <NavLink to={item.to}>
                {({ isActive }) => (
                  <div
                    className={cx("icon-container", {
                      active: isActive,
                      "top-devider": item.topDevider,
                    })}
                    onClick={() =>
                      isMobileSidebar && setMenuMobile?.(() => false)
                    }
                  >
                    <div
                      className={cx("icon")}
                      style={
                        menuActive
                          ? { marginRight: "15px" }
                          : { margin: "0 15px" }
                      }
                    >
                      {item.icon}
                    </div>
                    {menuActive && (
                      <div className={cx("label-child")}>{item.label}</div>
                    )}
                  </div>
                )}
              </NavLink>
            )}
            {item.children && menuActive && (
              <MenuItem
                setMenuMobile={setMenuMobile}
                menuItem={item.children}
                menuActive={menuActive}
                className="child-list"
                isShowed={open === item.id}
              />
            )}
          </li>)
        } else {
          if (role === "ADMIN") {
            return (<li key={index}>
              {item.children ? (
                <div
                  className={cx("icon-container", {
                    parentActive: open === item.id,
                    "top-devider": item.topDevider,
                  })}
                  onClick={() => {
                    onSetOpen &&
                      (open === item.id ? onSetOpen(-1) : onSetOpen(item.id || -1));
                  }}
                >
                  <div
                    className={cx("icon")}
                    style={
                      menuActive ? { marginRight: "15px" } : { margin: "0 15px" }
                    }
                  >
                    {item.icon}
                  </div>
                  {menuActive && <div className={cx("label")}>{item.label}</div>}
                  {item.children && item.children.length > 0 && menuActive && (
                    <div
                      className={cx(
                        "icon",
                        "icon-end",
                        open === item.id ? "icon-open" : "icon-close"
                      )}
                    >
                      <ChevronRight />
                    </div>
                  )}
                </div>
              ) : (
                <NavLink to={item.to}>
                  {({ isActive }) => (
                    <div
                      className={cx("icon-container", {
                        active: isActive,
                        "top-devider": item.topDevider,
                      })}
                      onClick={() =>
                        isMobileSidebar && setMenuMobile?.(() => false)
                      }
                    >
                      <div
                        className={cx("icon")}
                        style={
                          menuActive
                            ? { marginRight: "15px" }
                            : { margin: "0 15px" }
                        }
                      >
                        {item.icon}
                      </div>
                      {menuActive && (
                        <div className={cx("label-child")}>{item.label}</div>
                      )}
                    </div>
                  )}
                </NavLink>
              )}
              {item.children && menuActive && (
                <MenuItem
                  setMenuMobile={setMenuMobile}
                  menuItem={item.children}
                  menuActive={menuActive}
                  className="child-list"
                  isShowed={open === item.id}
                />
              )}
            </li>)
          }
        }
      })}
    </ul>
  );
};

export default MenuItem;
