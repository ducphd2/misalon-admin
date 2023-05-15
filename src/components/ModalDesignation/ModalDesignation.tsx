import React, { lazy, useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from "./ModalDesignation.module.scss";
import { ErrorIcon } from '../../assets/Icons';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
interface TModal {
    label?: string,
    onSubmit: (arg: string, agr2: string) => void,
    defaultValue?: string
    defaultOption?: any
}

const Button = lazy(() => import("../../components/Button"));
const Input = lazy(() => import("../../components/Input"));
function ModalDesignation({ label = "", onSubmit, defaultValue = "", defaultOption = "" }: TModal) {
    const cx = classNames.bind(styles)
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const [text, setText] = useState(defaultValue);
    const [inputError, setInputError] = useState("");

    const handleSubmit = () => {
        if (text === "") {
            setInputError("Please enter position name");
        } else {
            onSubmit(text, selectedOption)
        }
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value);
        setInputError("");
    };

    return (
        <div>
            <div className={cx("form-group", "form-Margin")}>
                <label>
                    Position Name<span className={cx("text-danger")}>*</span>
                </label>
                <Input
                    className={cx("form-controls")}
                    value={text}
                    onChange={handleChange}
                />
            </div>
            {inputError && (
                <div className={cx("error-wrapper")}>
                    <i>
                        <ErrorIcon />
                    </i>
                    <div className={cx("error-message")}>{inputError}</div>
                </div>
            )}
            <div className={cx("submit-section")}>
                <Button
                    label={label}
                    type="submit"
                    onClick={handleSubmit}
                    classType={cx("btn-modalSubmit")}
                />
            </div>
        </div>
    )
}

export default ModalDesignation