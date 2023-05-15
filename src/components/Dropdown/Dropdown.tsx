import React, { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import useClickOutside from "../../hooks/useClickOutside";
import Loading from "../Loading";

interface IDataItem {
  [key: string]: any;
}
interface DropdownProps {
  options: IDataItem[];
  setValueChosen: (value: any) => void;
  valueChosen: any;
  className?: string;
  value?: string;
  label?: string | number;
  title?: string;
  defaultValue?: IDataItem;
  loading?: boolean;
  handleGetOption?: () => void;
}

export default function Dropdown({
  options,
  className,
  label = "",
  title = "",
  value = "",
  setValueChosen,
  valueChosen,
  defaultValue,
  loading,
  handleGetOption,
}: DropdownProps) {
  const cx = classNames.bind(styles);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<IDataItem | undefined>(
    defaultValue
  );
  const ref = useRef<HTMLDivElement>();
  const handleOptionSelect = (option: IDataItem) => {
    setValueChosen(option[value]);
    setSelectedOption(option);
    setShowOptions(false);
  };

  const handleDropdownToggle = () => {
    setShowOptions(!showOptions);
    if (handleGetOption) {
      handleGetOption();
    }
  };
  useEffect(() => {
    if (valueChosen && options) {
      setSelectedOption(options.find((e) => e[value] === valueChosen));
    }
  }, [valueChosen, options]);
  useClickOutside(ref, () => setShowOptions(false));
  return (
    <div
      className={cx("dropdown-container", className)}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div
        className={
          showOptions === true
            ? cx("dropdown-headerShow")
            : cx("dropdown-header")
        }
        onClick={handleDropdownToggle}
      >
        <div className={cx("label")}>
          {selectedOption ? selectedOption[label] : title}
        </div>
        <div className={cx("icon")}>
          {showOptions === true ? (
            <FontAwesomeIcon
              style={{ color: "#DCDCDC" }}
              icon={faCaretDown}
              rotation={180}
            />
          ) : (
            <FontAwesomeIcon style={{ color: "#DCDCDC" }} icon={faCaretDown} />
          )}
        </div>
      </div>
      {showOptions && (
        <div className={cx("dropdown-options")}>
          {loading ? (
            <Loading />
          ) : (
            <>
              {options?.map((option, index) => (
                <div
                  key={index}
                  className={cx("dropdown-option", {
                    active:
                      selectedOption && selectedOption[value] === option[value],
                  })}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option[label]}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
