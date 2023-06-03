import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { BASE_API } from '../constants';
import { useAppDispatch } from '../redux/hooks';
import { selectAuthUser } from '../redux/slice/Authen/login';
import {
  addNewMessage,
  setConversation,
} from '../redux/slice/Conversation/Conversation';
import { setRecentlyMessages } from '../redux/slice/RecentlyMessages/RecentlyMessages';
import { EEventMessage } from './type';

export const socket = io(BASE_API);

const Socket = () => {
  const [isConnected, setIsConnected] = useState(true);
  const dispatch = useAppDispatch();
  const firstJoinRoom = useRef(true);
  const currentUser = useSelector(selectAuthUser);

  useEffect(() => {
    socket.on(EEventMessage.NEW_MESSAGE, (data: any) => {
      dispatch(addNewMessage(data));
    });

    socket.on(EEventMessage.CONVERSATION_MESSAGES, (data: any) => {
      dispatch(setConversation(data));
    });

    socket.on(EEventMessage.RECENT_MESSAGES, (data: any) => {
      dispatch(setRecentlyMessages(data));
    });

    socket.on('disconnect', () => {
      setIsConnected(!isConnected); 
      firstJoinRoom.current=true
    });

    if (firstJoinRoom.current) {
      const getCurrentUser = async () => {
        let merchant: any = await AsyncStorage.getItem('merchant');
        if (merchant) {
          socket.emit(
            EEventMessage.JOIN_ROOM,
            JSON.parse(merchant)?.userId + ''
          );
          firstJoinRoom.current = false;
        }
      };
      getCurrentUser();
    }

    return () => {
      socket.off(EEventMessage.NEW_MESSAGE);
      socket.off(EEventMessage.CONVERSATION_MESSAGES);
      socket.off(EEventMessage.RECENT_MESSAGES);
    };
  }, [currentUser, isConnected]);

  return <></>;
};

export default Socket;
