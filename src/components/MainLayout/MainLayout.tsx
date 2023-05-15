import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { Suspense, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import styles from "./MainLayout.module.scss";

type Props = {
  title: string;
  children: React.ReactNode;
  url?: string;
  menuItem?: any;
  titleButton?: string;
  showBreadcrumb?: boolean;
  handleClickAdd?: () => void;
  renderRightHeader?: () => JSX.Element;
};

function MainLayout({
  children,
  title,
  url,
  menuItem,
  showBreadcrumb,
  titleButton = "",
  handleClickAdd,
  renderRightHeader,
}: Props) {
  const location = useLocation();
  const cx = classNames.bind(styles);
  const urlDefault =
    typeof window !== undefined ? window.location.pathname : "";
  return (
    <div className={cx("page-wrapper")}>
      <div className={cx("content", "container-fluid")}>
        <div className={cx("page-header")}>
          <div className={cx("row", "align-items-center")}>
            <>
              <div className={cx("col")}>
                <div className={cx("page-title")}>
                  <h3>{title}</h3>
                  {menuItem && (
                    <div className={cx("page-links")}>
                      {menuItem?.map((menu: any) => (
                        <NavLink
                          key={menu.id}
                          to={`/${menu.to}`}
                          className={cx("link-dashboard", {
                            active: location.pathname === `/${menu.to}`,
                          })}
                        >
                          {menu.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
                <ul className={cx("breadcrumb")}>
                  {!showBreadcrumb && (
                    <Suspense fallback={<></>}>
                      <Breadcrumb link={url ? url : urlDefault} />
                    </Suspense>
                  )}
                </ul>
              </div>
              {titleButton !== "" && (
                <div className={cx("col-auto", "float-right", "ml-auto")}>
                  <div
                    className={`${cx("add-btn")} btn`}
                    onClick={handleClickAdd}
                  >
                    <i className={cx("fa", "fa-plus")}>
                      <FontAwesomeIcon icon={faPlus} />
                    </i>
                    {titleButton}
                  </div>
                </div>
              )}
              {renderRightHeader && (
                <div className={cx("col-auto", "float-right", "ml-auto")}>
                  {renderRightHeader()}
                </div>
              )}
            </>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
