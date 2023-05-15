import classNames from "classnames/bind";
import React, { useRef } from "react";
import { DropdownIcon } from "../../../assets/icons/HeaderIcons";
import styles from "./MenuItem.module.scss";
import useClickOutside from "../../../hooks/useClickOutside";

const cx = classNames.bind(styles);

export type TMenuItemProps = {
  children: React.ReactNode;
  noHover?: boolean;
  hasArrow?: boolean;
  isOpen?: boolean;
  badge?: number;
  setOpenMenu?: (isOpen: boolean) => void;
};

const MenuItem = ({
  children,
  isOpen,
  noHover = false,
  hasArrow = false,
  badge,
  setOpenMenu
}: TMenuItemProps) => {

  const modalRef = useRef<any>()
  useClickOutside(modalRef,
    () => setOpenMenu?.(false))

  return (
    <div className={cx("wrapper", noHover && "no-hover")} ref={modalRef} onClick={() => setOpenMenu?.(!isOpen)}>
      {children}
      {hasArrow && (
        <DropdownIcon
          className={cx("menu-icon", `${isOpen ? "rotation-arrow" : ""}`)}
        />
      )}
      {badge && <span className={cx("badge")}>{badge}</span>}
    </div>
  );
};

export default MenuItem;
