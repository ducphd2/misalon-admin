import React, { useState } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { Input } from "antd";
import { AiFillPicture, AiOutlineSend } from "react-icons/ai";
import { ContentType } from "../../redux/types/Chat/chat";
import { uploadImages } from "../../common/utils";

function InputChat({ onSend }: any) {
  const [messageContent, setMessageContent] = useState("");
  const handleChange = (e: any) => {
    setMessageContent(e.target.value);
  };
  const handleSend = () => {
    onSend(messageContent, ContentType.TEXT);
    setMessageContent("");
  };
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleUpload = async (event: any) => {
    try {
      const res = await uploadImages(event.target.files);
      if (res) {
        for (let i = 0; i < res.length; i++) {
          onSend(res[i].url, ContentType.IMAGE);
        }
      }
    } catch (error) {}
  };
  return (
    <ContainerInput>
      {/* <EmojiPicker /> */}
      <ButtonImagePicker>
        <AiFillPicture color="white" />
        <input
          type="file"
          accept="image/*"
          style={{
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          onChange={handleUpload}
        />
      </ButtonImagePicker>

      <InputSend
        value={messageContent}
        placeholder="Type your message..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <ButtonSend onClick={handleSend}>
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
const ButtonImagePicker = styled.button`
  display: flex;
  background-color: #ccc;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  height: 37px;
  width: 37px;
  margin-left: 10px;
  margin-right: 10px;
  border: none;
`;

export default InputChat;
