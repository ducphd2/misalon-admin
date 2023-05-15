import React from "react";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import { ErrorIcon } from "../../assets/Icons";

interface InputProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  required?: boolean;
  name?: string;
  errorMessage?: string | null;
  maxWidth?: string;
  invalid?: boolean;
  disabled?: boolean;
  value?: string | number;
  type?: string;
}

const cx = classNames.bind(styles);

export default function Input({
  label,
  className = "",
  errorMessage,
  maxWidth,
  invalid,
  required,
  ...props
}: InputProps) {
  return (
    <div className={cx("input-wrapper", className)}>
      {label && <div className={cx("input-label")}>{label} {required && <span className="text-danger">*</span>}</div>}
      <div className={cx("input-container")} style={{ maxWidth }}>
        <input
          className={cx("input-content", {
            error: errorMessage,
            invalid: invalid,
          })}
          {...props}
        />

        {errorMessage && (
          <div className={cx("error-wrapper")}>
            <i>
              <ErrorIcon />
            </i>
            <div className={cx("error-message")}>{errorMessage}</div>
          </div>
        )}
      </div>
    </div>
  );
}
