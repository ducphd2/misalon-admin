import React from 'react'
import classNames from "classnames/bind";
import styles from "./PersonalInfo.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
interface PersonalInfoProfileProps{
  setShowModalPersonal:any
}
const cx = classNames.bind(styles);
export default function PersonalInfoProfile({setShowModalPersonal}:PersonalInfoProfileProps) {
  const handleShowModal=()=>{
    setShowModalPersonal(true)
  }
  return (
    <div className="col-md-6 d-flex">
    <div className={cx("card", "profile-box", "flex-fill")}>
      <div className={cx("card-body")}>
        <h3 className={cx("card-title")}>Personal Informations 
        <span onClick={()=>handleShowModal()} 
          className={cx("edit-icon")}>
          <FontAwesomeIcon icon={faPencil} /></span></h3>
        <ul className={cx("personal-info")}>
          <li>
            <div className={cx("title")}>Salutation:</div>
            <div className={cx("text")}>Mr.</div>
          </li>
          <li>
            <div className={cx("title")}>Full Name:</div>
            <div className={cx("text")}>Soumyadip</div>
          </li>
          <li>
            <div className={cx("title")}>Birth-Date:</div>
            <div className={cx("text")}>Soumyadip</div>
          </li>
          <li>
            <div className={cx("title")}>Location:</div>
            <div className={cx("text")}>Demo</div>
          </li>
          <li>
            <div className={cx("title")}>Region Name:</div>
            <div className={cx("text")}> Demo</div>
          </li>
        
        
          
        
        <li>
            <div className={cx("title")}>Permanent Address:</div>
            <div className={cx("text")}> Demo</div>
          </li>
          <li>
            <div className={cx("title")}>Home Address:</div>
            <div className={cx("text")}> Demo</div>
          </li>
          <li>
            <div className={cx("title")}>Postal Code:</div>
            <div className={cx("text")}> Demo</div>
          </li>
          <li>
            <div className={cx("title")}>Current Pincode:</div>
            <div className={cx("text")}> Demo</div>
          </li>
          
          
          <hr/>
          <li>
            <div className={cx("title")}>Birthday Celebration:</div>
            <div className={cx("text")}> Demo</div>
          </li>
          <li>
            <div className={cx("title")}>Birth Place:</div>
            <div className={cx("text")}> Demo</div>
          </li>
          <li>
            <div className={cx("title")}>Birth State:</div>
            <div className={cx("text")}> Demo</div>
          </li>
          <li>
            <div className={cx("title")}>Birth Country:</div>
            <div className={cx("text")}> Demo</div>
          </li>
            <li>
            <div className={cx("title")}>Marital status  :</div>
            <div className={cx("text")}> Demo</div>
          </li>
            <li>
            <div className={cx("title")}>Marriage Date:</div>
            <div className={cx("text")}> Demo</div>
          </li>
          <hr/>
          
            <li>
            <div className={cx("title")}>Blood Group:</div>
            <div className={cx("text")}> Demo</div>
          </li>
          
            <li>
            <div className={cx("title")}>Blood Group RH:</div>
            <div className={cx("text")}> Demo</div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  )
}
