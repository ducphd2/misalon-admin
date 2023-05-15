import React from "react";
import classNames from "classnames/bind";
import styles from "./Breadcrumb.module.scss";
import { Link } from "react-router-dom";
interface Breadcrumb {
  link: string;
}
const cx = classNames.bind(styles);
export default function Breadcumb({ link }: Breadcrumb) {
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g;
  const linkToTitle = link.replace(regex, " ");
  return (
    <ul className={cx("breadcrumb")}>
      <li className={cx("breadcrumb-item")}>
        <Link to="/">Dashboard</Link>
      </li>
      <li className={cx("breadcrumb-item", "active")}>/</li>
      <li className={cx("breadcrumb-item", "active")}>{linkToTitle}</li>
    </ul>
  );
}
