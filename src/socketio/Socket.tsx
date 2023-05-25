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
    const reconnect = () => {
      socket.connect(); // Attempt to reconnect
    };

    socket.on(EEventMessage.NEW_MESSAGE, (data: any) => {
      dispatch(addNewMessage(data));
    });

    socket.on(EEventMessage.CONVERSATION_MESSAGES, (data: any) => {
      dispatch(setConversation(data));
    });

    socket.on(EEventMessage.RECENT_MESSAGES, (data: any) => {
      dispatch(setRecentlyMessages(data));
    });

    socket.on('connect', () => {
      setIsConnected(true); // Set connection status to true when connected
    });

    socket.on('disconnect', () => {
      setIsConnected(false); // Set connection status to false when disconnected
    });
    if (!isConnected) {
      const reconnectInterval = setInterval(reconnect, 1000); // Attempt reconnect every 5 seconds

      return () => {
        clearInterval(reconnectInterval); // Clear reconnect interval when component unmounts
      };
    }
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
