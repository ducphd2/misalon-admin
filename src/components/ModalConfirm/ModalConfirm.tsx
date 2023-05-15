import React, { Suspense, lazy } from "react";
import styles from "./ModalConfirm.module.scss";
import classNames from "classnames/bind";

const ModalDesignation = lazy(() => import("../Modal/Modal"));
const Button = lazy(() => import("../Button/Button"));

interface ModalConfirm {
  title?: string;
  subTitle?: string;
  isModal?: boolean;
  confirmText: string;
  cancelText: string;
  setOpenModals: (isModal: boolean) => void;
  onClick: () => void;
}

function ModalConfirm({
  title,
  subTitle,
  isModal,
  confirmText,
  cancelText,
  onClick,
  setOpenModals,
}: ModalConfirm) {
  const cx = classNames.bind(styles);

  return (
    <Suspense fallback={<></>}>
      <ModalDesignation
        title={title}
        isModal={isModal}
        setOpenModals={setOpenModals}
      >
        <p className={cx("sub-title")}>{subTitle}</p>
        <div className={cx("modal-btn")}>
          <div className={cx("row")}>
            <div className={cx("col-6")}>
              <Suspense fallback={<></>}>
                <Button
                  label={confirmText}
                  classType={cx("btn-confirm")}
                  maxWidth="100%"
                  borderRadius="50px"
                  onClick={onClick}
                />
              </Suspense>
            </div>
            <div className={cx("col-6")}>
              <Suspense fallback={<></>}>
                <Button
                  label={cancelText}
                  classType={cx("btn-confirm")}
                  maxWidth="100%"
                  borderRadius="50px"
                  onClick={() => setOpenModals(false)}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </ModalDesignation>
    </Suspense>
  );
}
export default ModalConfirm;
