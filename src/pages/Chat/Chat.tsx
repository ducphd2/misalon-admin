import React, { useState } from "react";
import Styles from "./chat.module.scss";
import ChatBox from "./ChatBox";
import { UserOutlined } from "@ant-design/icons";
import { Input, Avatar } from "antd";
const { Search } = Input;

function Chat() {
  const [active, setActive] = useState<string>("");
  const activeChat = (values: string) => {
    setActive(values);
  };
  return (
    <div className={Styles.main}>
      <div className={Styles.listChat}>
        <div className={Styles.headerChat}>
          <div>Chat</div>
          <Search
            placeholder="input search loading default"
            loading={false}
            style={{ marginBottom: "15px" }}
          />
        </div>
        <div
          className={
            Styles.itemChat + " " + `${active === "1" ? Styles.activeChat : ""}`
          }
          onClick={() => {
            activeChat("1");
          }}
        >
          <div className={Styles.avatar}>
            <Avatar size={34} icon={<UserOutlined />} />
          </div>
          <div className={Styles.nameUser}>
            <div>Thoai Nguyen</div>
            <div>Bạn cần chúng tôi giúp gì nhỉ</div>
          </div>
        </div>
        <div
          className={
            Styles.itemChat + " " + `${active === "2" ? Styles.activeChat : ""}`
          }
          onClick={() => {
            activeChat("2");
          }}
        >
          <div className={Styles.avatar}>
            <Avatar size={34} icon={<UserOutlined />} />
          </div>
          <div className={Styles.nameUser}>
            <div>Duc sep Adamo</div>
            <div>Bạn cần chúng tôi giúp gì nhỉ</div>
          </div>
        </div>
        <div
          className={
            Styles.itemChat + " " + `${active === "3" ? Styles.activeChat : ""}`
          }
          onClick={() => {
            activeChat("3");
          }}
        >
          <div className={Styles.avatar}>
            <Avatar size={34} icon={<UserOutlined />} />
          </div>
          <div className={Styles.nameUser}>
            <div>Huynh Duc</div>
            <div>Bạn cần chúng tôi giúp gì nhỉ</div>
          </div>
        </div>
      </div>
      <div className={Styles.content}>
        <ChatBox />
      </div>
    </div>
  );
}

export default Chat;
