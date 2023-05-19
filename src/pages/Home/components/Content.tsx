import React from "react";
import Styles from "./style.module.scss";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Tooltip } from "antd";
import { FcEngineering } from "react-icons/fc";
import Job from "../../../assets/images/job-profile.png";

function ContentHome() {
  return (
    <div className={Styles.wrapperMain}>
      <div className="flex row justify-content-between align-items-center">
        <div className={Styles.bookingLeft}>
          <h1>Find Your Service And Booking Here</h1>
          <p className={Styles.textFooter}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            voluptatem eaque reiciendis facilis.
          </p>
          <div className={Styles.desBooking}>
            {" "}
            <span>Trending Keywords: </span>Ultimate Relaxation,Luxury
            Experience,Indulge in Pampering,
          </div>
        </div>
        <div className={Styles.bookingRight}>
          <img src={Job} alt="" />
          <div
            className={`${Styles.itemBooking}` + " " + Styles.itemCenter}
            style={{
              top: "50px",
              left: "-100px",
            }}
          >
            <FcEngineering style={{ marginRight: "10px" }} />
            Booking Now
          </div>
          <div
            className={`${Styles.itemBooking}` + " " + Styles.itemCenter}
            style={{
              bottom: "50px",
              right: "-100px",
            }}
          >
            Bookings
            <Avatar.Group
              maxCount={2}
              maxPopoverTrigger="click"
              size="small"
              maxStyle={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                cursor: "pointer",
              }}
              style={{ marginLeft: "10px" }}
            >
              <Avatar src="https://cdn-img.thethao247.vn/storage/files/phucchung/2023/03/19/frenkie-de-jong-away-1679189696-083602.jpeg" />
              <Avatar src="https://cdn.vox-cdn.com/thumbor/m-2jBCE1Q-PjrPQAXaf8RP_62GY=/0x0:4000x2667/1200x800/filters:focal(1811x503:2451x1143)/cdn.vox-cdn.com/uploads/chorus_image/image/71990164/1466797563.0.jpg" />
              <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
              <Avatar
                style={{ backgroundColor: "#1890ff" }}
                icon={<AntDesignOutlined />}
              />
            </Avatar.Group>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentHome;
