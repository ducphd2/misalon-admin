import { UserOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import { useEffect, useRef } from 'react';
import { AiOutlineBell, AiOutlineSearch } from 'react-icons/ai';
import { styled } from 'styled-components';
import { useAppSelector } from '../../redux/hooks';
import { selectConversation } from '../../redux/slice/Conversation/Conversation';
import { ContentType } from '../../redux/types/Chat/chat';
import { socket } from '../../socketio/Socket';
import { ConversationRq, EEventMessage } from '../../socketio/type';
import { IMessageType } from './Chat';
import InputChat from './InputChat';
import Styles from './chat.module.scss';

function ChatBox({ otherUserId, UserChating }: any) {
  const ref = useRef<any>(null);
  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const merchant = JSON.parse(localStorage.getItem('merchant') as any);
  const conversation: any = useAppSelector(selectConversation);

  useEffect(() => {
    const conversationRq: ConversationRq = {
      userId: merchant.userId + '',
      otherUserId,
      limit: 50,
      page: 1,
    };
    console.log('conversation', conversationRq);
    socket.emit(EEventMessage.CONVERSATION_MESSAGES, conversationRq);
  }, []);

  const sendMessage = (content: string, type: ContentType) => {
    const data = {
      senderId: merchant.userId + '',
      receiverName: UserChating.name,
      senderName: merchant.name,
      receiverId: UserChating.id + '',
      senderAvatar: merchant?.avatar,
      receiverAvatar: UserChating.avatar,
      content: content,
      type: ContentType.TEXT,
    };
    socket.emit(EEventMessage.CREATE_MESSAGE, data);
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <div>
      <UserChatTop>
        <SFlexItem>
          {' '}
          <Avatar
            size={34}
            icon={<UserOutlined />}
            style={{ marginRight: '10px' }}
          />{' '}
          {UserChating?.name}
        </SFlexItem>
        <SFlexItem>
          <AiOutlineSearch size={28} style={{ margin: '0px 10px' }} />
          <AiOutlineBell size={28} />
        </SFlexItem>
      </UserChatTop>
      <ContentChat className={Styles.contentChat}>
        {conversation?.map((item: IMessageType) => {
          if (merchant.userId != item.senderId) {
            if (item.type === ContentType.IMAGE) {
              return (
                <Item key={item._id}>
                  <CustomImage
                    src={item.content}
                    className={Styles.itemImageMessage}
                  />
                </Item>
              );
            } else {
              return (
                <Item key={item._id}>
                  <TextWrapContent className={Styles.itemMessage}>
                    {item.content}
                  </TextWrapContent>
                </Item>
              );
            }
          } else {
            if (item.type === ContentType.IMAGE) {
              return (
                <Item key={item._id}>
                  <CustomImage
                    src={item.content}
                    className={Styles.itemImageMessage}
                  />
                </Item>
              );
            } else {
              return (
                <Item key={item._id}>
                  <TextWrap className={Styles.itemMessage}>
                    {item.content}
                  </TextWrap>
                </Item>
              );
            }
          }
        })}
        <div ref={ref}></div>
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

const CustomImage = styled(Image)`
  width: 100px;
  height: 200px !important;
  background-color: white;
  height: 43px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ChatBox;
