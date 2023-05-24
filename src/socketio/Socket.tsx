import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
// import { addNewMessage, setConversation } from "../stores/conversation.reducer";
import { EEventMessage } from "./type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../redux/hooks";
import { selectAuthUser } from "../redux/slice/Authen/login";
import {
  addNewMessage,
  setConversation,
} from "../redux/slice/Conversation/Conversation";
import { setRecentlyMessages } from "../redux/slice/RecentlyMessages/RecentlyMessages";
export const socket = io("http://103.82.20.139:3001");

const Socket = () => {
  const dispatch = useAppDispatch();
  const firstJoinRoom = useRef(true);
  const currentUser = useSelector(selectAuthUser);

  useEffect(() => {
    socket.on(EEventMessage.NEW_MESSAGE, (data: any) => {
      dispatch(addNewMessage(data));
    });

    socket.on(EEventMessage.CONVERSATION_MESSAGES, (data: any) => {
      dispatch(setConversation(data.reverse()));
    });

    socket.on(EEventMessage.RECENT_MESSAGES, (data: any) => {

      dispatch(setRecentlyMessages(data));
    });

    if (firstJoinRoom.current) {
      const getCurrentUser = async () => {
        let merchant: any = await AsyncStorage.getItem("merchant");
        if (merchant) {
          socket.emit(EEventMessage.JOIN_ROOM, JSON.parse(merchant)?.userId);
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
  }, [currentUser]);

  return <></>;
};

export default Socket;
