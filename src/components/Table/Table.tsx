import classNames from "classnames/bind";
import React from "react";
import styles from "./Table.module.scss";

const cx = classNames.bind(styles);

function Table({children,classCustom}:any) {
  return (
    <div className={cx("table-wrapper",classCustom)} >
			<table>
				{children}
			</table>
    </div>
  );
}

export default Table;
