import CryptoJS from "crypto-js";
import { AES_KEY } from "../constants";

export const encryptData = (text: string) => {
  return CryptoJS.AES.encrypt(text, AES_KEY).toString();
};

export const decryptData = (encryptedData: string) => {
  let bytes = CryptoJS.AES.decrypt(encryptedData, AES_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
