import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input, Avatar } from "antd";
import InputChat from "./InputChat";
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import styles, { styled } from "styled-components";

function ChatBox() {
  return (
    <div>
      <UserChatTop>
        <SFlexItem>
          {" "}
          <Avatar
            size={34}
            icon={<UserOutlined />}
            style={{ marginRight: "10px" }}
          />{" "}
          Nguyễn Văn A
        </SFlexItem>
        <SFlexItem>
          <AiOutlineSearch size={28} style={{ margin: "0px 10px" }} />
          <AiOutlineBell size={28} />
        </SFlexItem>
      </UserChatTop>
      <ContentChat>
        <Item>
          <TextWrapContent>ádkasdkadnkasn</TextWrapContent>
        </Item>
        <Item>
          <TextWrap>test chat</TextWrap>
        </Item>
        <Item>
          <TextWrapContent>ádkasdkadnkasn</TextWrapContent>
        </Item>
        <Item>
          <TextWrap>test chat</TextWrap>
        </Item>
      </ContentChat>
      <InputChat />
    </div>
  );
}
const UserChatTop = styled.div`
  width: 100%;
  height: 70px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
`;

const ContentChat = styled.div`
  padding: 10px 0px;
  width: 100%;
`;
const Item = styled.div`
  width: 100%;
  position: relative;
  height: 50px;
`;
const TextWrapContent = styled.div`
  background-color: white;
  height: 43px;
  width: 150px;
  border-radius: 4px;
  padding: 0px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TextWrap = styled.div`
  background-color: white;
  height: 43px;
  float: right;
  width: 83px;
  margin-right: 15px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0ab39c;
  background-color: #d0eaeb;
`;

const SFlexItem = styled.div`
  display: flex;
  align-items: center;
`;

export default ChatBox;