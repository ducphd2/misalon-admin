import React, { lazy, useRef, useState } from 'react'
import classNames from 'classnames/bind';
import styles from "./Modal.module.scss"
import useClickOutside from "../../hooks/useClickOutside";


interface ModalProps {
  title?: string
  isModal?: boolean;
  setOpenModals: (isModal: boolean) => void;
  children?: any;
  customClass?: string
  classType?: string;
}

function ModalDesignation({
  title,
  isModal,
  setOpenModals,
  customClass,
  children,
  classType,
}: ModalProps) {
  const cx = classNames.bind(styles)
  const modalRef = useRef<any>()
  useClickOutside(modalRef,
    () => setOpenModals(false))

  return isModal === true ? (
    <div className={`${cx("modal")} ${classType}`}>
      <div className={cx("modal-dialog", "modal-dialog-centered", customClass)} role="document" ref={modalRef}>
        <div className={`${cx("modal-content")} modal-content`}>
          <div className={cx("modal-header")}>
            <h5 className={cx("modal-title")}>{title}</h5>
            <button type="button" className={cx("close-button")} onClick={() => setOpenModals(false)}>
              <span aria-hidden="true" >&times;</span>
            </button>
          </div>
          <div className={cx("modal-body")}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
    : null
}

export default ModalDesignation