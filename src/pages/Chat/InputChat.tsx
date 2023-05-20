import React from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { Input } from "antd";
import { AiOutlineSend } from "react-icons/ai";

function InputChat() {
  return (
    <ContainerInput>
      {/* <EmojiPicker /> */}
      <InputSend placeholder="Type your message..." />
      <ButtonSend>
        <AiOutlineSend color="white" />
      </ButtonSend>
    </ContainerInput>
  );
}

const ContainerInput = styled.div`
  height: 86px;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  justify-content: space-between;
  position: absolute;
  bottom: 0px;
  right: 0px;
`;
const InputSend = styled(Input)`
  background-color: #f3f6f9;
  border: none;
  height: 37px;
`;
const ButtonSend = styled.button`
  display: flex;
  background-color: #33416e;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  height: 37px;
  width: 37px;
  margin-left: 10px;
  border: none;
`;

export default InputChat;
