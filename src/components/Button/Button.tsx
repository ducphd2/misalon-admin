import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames/bind";

type ButtonProps = {
  maxWidth?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  label: string;
  classType?: string;
  borderRadius?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const cx = classNames.bind(styles);

const Button = ({
  maxWidth,
  type = "button",
  disabled = false,
  label,
  classType = "",
  borderRadius,
  icon,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      style={{ maxWidth, borderRadius }}
      type={type}
      disabled={disabled}
      className={`${cx("button")} ${classType} ${
        disabled && cx("styleDisable")
      }`}
      onClick={onClick}
      {...props}
    >
      {icon ? <i>{icon}</i> : null}
      {label}
    </button>
  );
};

export default Button;
