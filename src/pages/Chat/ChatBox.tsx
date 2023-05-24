import React, { useEffect, useRef } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input, Avatar } from "antd";
import InputChat from "./InputChat";
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import styles, { styled } from "styled-components";
import { ConversationRq, EEventMessage } from "../../socketio/type";
import { useAppSelector } from "../../redux/hooks";
import { selectConversation } from "../../redux/slice/Conversation/Conversation";
import { socket } from "../../socketio/Socket";
import { Itype } from "./Chat";
import Styles from "./chat.module.scss";
import { ContentType } from "../../redux/types/Chat/chat";

function ChatBox({ otherUserId, UserChating }: any) {
  const ref = useRef<any>(null);
  const scrollToBottom = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };
  const merchant = JSON.parse(localStorage.getItem("merchant") as any);
  const conversation: any = useAppSelector(selectConversation);
  useEffect(() => {
    const conversationRq: ConversationRq = {
      userId: merchant.userId + "",
      otherUserId,
      limit: 50,
      page: 1,
    };
    console.log({ conversationRq });
    socket.emit(EEventMessage.CONVERSATION_MESSAGES, conversationRq);
  }, []);

  const sendMessage = (content: string, type: ContentType) => {
    const data = {
      senderId: merchant.userId+"",
      receiverName: UserChating.name,
      senderName: merchant.name,
      receiverId:  UserChating.id+"",
      senderAvatar: merchant?.avatar,
      receiverAvatar:  UserChating.avatar,
      content: content,
      type: ContentType.TEXT,
    };
    socket.emit(EEventMessage.CREATE_MESSAGE, data);
  };

  useEffect(()=>{
    scrollToBottom();
  },[conversation])

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
          {UserChating?.name}
        </SFlexItem>
        <SFlexItem>
          <AiOutlineSearch size={28} style={{ margin: "0px 10px" }} />
          <AiOutlineBell size={28} />
        </SFlexItem>
      </UserChatTop>
      <ContentChat className={Styles.contentChat}>
        {conversation?.map((item: Itype) => {
          if (merchant.userId != item.senderId)
            return (
              <Item>
                <TextWrapContent className={Styles.itemMessage}>
                  {item.content}
                </TextWrapContent>
              </Item>
            );
          else {
            return (
              <Item>
                <TextWrap className={Styles.itemMessage}>
                  {item.content}
                </TextWrap>
              </Item>
            );
          }
        })}
      <div ref={ref}></div>
        {/* <Item>
          <TextWrapContent>ádkasdkadnkasn</TextWrapContent>
        </Item>
        <Item>
          <TextWrap>test chat</TextWrap>
        </Item> */}
      </ContentChat>
      <InputChat onSend={sendMessage} />
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
  padding: 10px 0px 85px;
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
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TextWrap = styled.div`
  background-color: white;
  height: 43px;
  float: right;
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
