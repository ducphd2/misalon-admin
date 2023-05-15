import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisVertical,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./DropDownEdit.module.scss";

const className = classNames.bind(styles);
function DropDownEdit({
  customClass,
  handleEdit,
  handleDelete,
  deleteCondition,
}: any) {
  const [showEdit, setShowEdit] = useState(false);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowEdit(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleClickEdit = () =>  {
    handleEdit()
    setShowEdit(false);
  }

  const handleClickDelete = () =>  {
    handleDelete()
    setShowEdit(false);
  }
  
  return (
    <div
      className={className(
        "dropdown",
        "dropdown-action",
        customClass,
      )}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div
        className={className("action-icon", "dropdown-toggle")}
        onClick={() => setShowEdit(!showEdit)}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
      {showEdit && (
        <Fragment>
            <div
              className={className(
                "dropdown-menu",
                "dropdown-menu-right",
                "show"
              )}
            >
              <div
                className={className("dropdown-item", "dropdown-item-custom")}
                onClick={handleClickEdit}
              >
                <FontAwesomeIcon icon={faPencil} /> Edit
              </div>
              {deleteCondition && (
                <div
                  className={className("dropdown-item", "dropdown-item-custom")}
                  onClick={handleClickDelete}
                >
                  <FontAwesomeIcon icon={faTrashCan} /> Delete
                </div>
              )}
            </div>
        </Fragment>
      )}
    </div>
  );
}

export default DropDownEdit;
