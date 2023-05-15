import React, { forwardRef, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePickerCustom.module.scss";
import "./DatePicker.scss";
import classNames from "classnames/bind";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

interface TypeDate {
  onChange: (date: any) => void;
  defaultValue: any;
  format?: string;
  label?: string;
  className?: string;
  minDate?: Date; // minDate={new Date()} => exclude past dates
  maxDate?: Date;
}

function DatePickerCustom({
  defaultValue,
  onChange,
  format = "DD/MM/YYYY",
  minDate,
  maxDate,
  label = "From",
  className,
  ...props
}: TypeDate) {
  const [modeDay, setModeDay] = useState(true);
  const [modeMonth, setModeMonth] = useState(false);
  const [modeYear, setModeYear] = useState(false);

  const handleChangeMode = () => {
    if (modeDay) {
      setModeMonth(true);
      setModeDay(false);
    } else if (modeMonth) {
      setModeYear(true);
      setModeMonth(false);
    } else {
      setModeDay(true);
      setModeYear(false);
    }
  };
  const handleClick = () => {
    if (defaultValue === null) {
      onChange(new Date());
    }
  };

  const handleChange = (date: any) => {
    onChange(date);
    setModeDay(true);
    setModeMonth(false);
    setModeYear(false);
  };

  const CustomInputDate = forwardRef(({ value, onClick }: any, ref: any) => (
    <div
      className={cx([
        "form-group",
        "form-focus",
        `${defaultValue !== null && "focused"}`,
      ])}
      onClick={handleClick}
    >
      <input
        type="text"
        className={`${cx([
          "form-control",
          "floating",
          label === "" ? "hide-label" : "show-label",
          className,
        ])} form-control`}
        onClick={onClick}
        value={defaultValue === null ? "" : moment(defaultValue).format(format)}
        onChange={() => {}}
      />
      {label && <label className={cx("focus-label")}>{label}</label>}
     <span onClick={onClick} className={cx("wrap-icon")}>
     <FontAwesomeIcon
        className={cx("icon-date")}
        icon={faCalendarDays}
        style={{ color: "#979797" }}
      />
     </span>
    </div>
  ));

  return (
    <DatePicker
      // inline
      selected={defaultValue}
      maxDate={maxDate}
      onChange={handleChange}
      calendarClassName={cx("calendar-custom")}
      minDate={minDate}
      showYearPicker={modeYear}
      showMonthYearPicker={modeMonth}
      customInput={<CustomInputDate />}
      disabledKeyboardNavigation
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        decreaseYear,
        increaseYear,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
        prevYearButtonDisabled,
        nextYearButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              type="button"
              className={cx("btn-arrow-custom")}
              onClick={modeYear ? decreaseYear : decreaseMonth}
              disabled={
                modeYear ? prevYearButtonDisabled : prevMonthButtonDisabled
              }
            >
              <FontAwesomeIcon
                icon={faAngleLeft}
                style={{ color: "#212529" }}
              />
            </button>
            <span
              onClick={() => {
                handleChangeMode();
              }}
              className={cx("datepicker-title-custom")}
            >
              {moment(date).format("MMMM")} {moment(date).format("YYYY")}
            </span>
            <button
              type="button"
              className={cx("btn-arrow-custom")}
              onClick={modeYear ? increaseYear : increaseMonth}
              disabled={
                modeYear ? nextYearButtonDisabled : nextMonthButtonDisabled
              }
            >
              <FontAwesomeIcon
                icon={faAngleRight}
                style={{ color: "#212529" }}
              />
            </button>
          </div>
          {/* <div>{moment(date).format("DD.MM.YYYY")}</div> */}
        </div>
      )}
      {...props}
    />
  );
}

export default DatePickerCustom;
