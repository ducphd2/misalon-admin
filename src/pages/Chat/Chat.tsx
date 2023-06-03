import React, { useCallback, useEffect, useState } from 'react';
import Styles from './chat.module.scss';
import ChatBox from './ChatBox';
import { UserOutlined } from '@ant-design/icons';
import { Input, Avatar } from 'antd';
import { useAppSelector } from '../../redux/hooks';
import { selectRecentlyMessages } from '../../redux/slice/RecentlyMessages/RecentlyMessages';
import { socket } from '../../socketio/Socket';
import { EEventMessage } from '../../socketio/type';
import { decryptData } from '../../common/aes';
const { Search } = Input;

export interface IMessageType {
  _id: string;
  content: string;
  createdAt: string;
  receiverAvatar: string;
  senderAvatar: string;
  receiverId: string;
  receiverName: string;
  senderId: string;
  senderName: string;
  type: string;
}

export enum EInfoType {
  USERNAME = 'USERNAME',
  ID = 'ID',
  AVATAR = 'AVATAR',
}

function Chat() {
  const [active, setActive] = useState<string>('');
  const [UserChating, setUserChating] = useState<any>();
  const merchant = JSON.parse(localStorage.getItem('merchant') as any);

  const userSelected = (item: IMessageType) => {
    if (merchant.userId == item.senderId) {
      setUserChating({
        id: item.receiverId,
        name: item.receiverName,
        avatar: item.receiverAvatar,
      });
    } else {
      setUserChating({
        id: item.senderId,
        name: item.senderName,
        avatar: item.senderAvatar,
      });
    }
  };

  const activeChat = (values: string) => {
    setActive(values);
  };

  const recentlyMessages: IMessageType[] = useAppSelector(
    selectRecentlyMessages
  );
  useEffect(() => {
    const recentMessagesRq = {
      userId: merchant.userId + '',
      page: 1,
      limit: 10,
    };
    socket.emit(EEventMessage.RECENT_MESSAGES, recentMessagesRq);
  }, []);

  const getInfo = useCallback(
    (infoType: EInfoType, item: IMessageType) => {
      if (infoType == EInfoType.ID)
        return merchant.userId == item.senderId
          ? item.receiverId
          : item.senderId;
      else if (infoType == EInfoType.AVATAR)
        return merchant.userId == item.senderId
          ? item.receiverAvatar
          : item.senderAvatar;
      else
        return merchant.userId == item.senderId
          ? item.receiverName
          : item.senderName;
    },
    [merchant]
  );

  const contentMess=(content: string)=>{
    if (decryptData(content).includes("http")) {
      return "Tin nhắn hình ảnh"
    }
    return decryptData(content);
  }

  return (
    <div className={Styles.main}>
      <div className={Styles.listChat}>
        <div className={Styles.headerChat}>
          <div>Chat</div>
          <Search
            placeholder="input search loading default"
            loading={false}
            style={{ marginBottom: '15px' }}
          />
        </div>
        {recentlyMessages.map((item) => {
          return (
            <div
              key={item._id}
              className={
                Styles.itemChat +
                ' ' +
                `${
                  active === getInfo(EInfoType.ID, item)
                    ? Styles.activeChat
                    : ''
                }`
              }
              onClick={() => {
                activeChat(getInfo(EInfoType.ID, item));
                userSelected(item);
              }}
            >
              <div className={Styles.avatar}>
                <Avatar size={34} icon={<UserOutlined />} />
              </div>
              <div className={Styles.nameUser}>
                <div>{getInfo(EInfoType.USERNAME, item)}</div>
                <div className={Styles.contentMessage}>{contentMess(item.content)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {active && (
        <div className={Styles.content}>
          <ChatBox otherUserId={active} UserChating={UserChating} />
        </div>
      )}
    </div>
  );
}

export default Chat;
