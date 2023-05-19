import React from "react";
import Styles from "./style.module.scss";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { SiGooglechrome } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";
import Logo from "../../../assets/images/logo-booking.svg";

function FooterHome() {
  return (
    <div
      style={{
        width: "100%",
        height: "352px",
        background: "#202529",
        padding: "0px 10%",
      }}
      className={"row"}
    >
      <div className={"col-sm-3" + " " + Styles.logo}>
        <img src={Logo} alt="" />
        <p className={Styles.textFooter}>
          You can build any type of web application like eCommerce, CRM, CMS
        </p>
        <div className={Styles.flexCenterBetween} style={{ width: "70%" }}>
          <BsFacebook color="#9ba7b3" size={20} />{" "}
          <BsGithub color="#9ba7b3" size={20} />{" "}
          <SiGooglechrome color="#9ba7b3" size={20} />{" "}
          <RiInstagramFill size={20} color="#9ba7b3" />
        </div>
        <p className={Styles.textFooter}>@SalonSpa</p>
      </div>
      <div className="col-sm-9">
        <div
          className="row
        "
        >
          <div className="col-sm-4">
            <h5>Company</h5>
            <p className={Styles.textFooter}>About Us</p>
            <p className={Styles.textFooter}>Gallery </p>
          </div>
          <div className="col-sm-4">
            {" "}
            <h5>For Jobs</h5> <p className={Styles.textFooter}>Job List</p>
            <p className={Styles.textFooter}>Application </p>
          </div>
          <div className="col-sm-4">
            <h5>Support</h5>
            <p className={Styles.textFooter}>FAQ</p>
            <p className={Styles.textFooter}>Contact </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterHome;
