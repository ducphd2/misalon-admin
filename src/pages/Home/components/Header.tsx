import React from "react";
import { FiUser } from "react-icons/fi";
import Styles from "./style.module.scss";
import Logo from "../../../assets/images/logo.png";

function HeaderHome() {
  return (
    <div style={{ height: "72px", width: "100%", padding: "20px 5%" }}>
      <div className={Styles.flexCenterBetween}>
        <div className={Styles.logo}>
          <img src={Logo} alt="" />
        </div>
        <div className={Styles.flexCenterBetween}>
          <div className={Styles.navLink}>Booking</div>
          <div className={Styles.navLink}>Services</div>
          <div className={Styles.navLink}>Branches</div>
          <div className={Styles.navLink}>Promotion</div>
        </div>
        <div className={`${Styles.btn}` + " " + `${Styles.flexCenterBetween}`}>
          <button>
            <FiUser style={{ marginBottom: "3px", marginRight: "5px" }} />
            Login
          </button>
          <button>
            {" "}
            <FiUser style={{ marginBottom: "3px", marginRight: "5px" }} />
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderHome;
