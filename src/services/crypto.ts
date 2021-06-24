import { AES, enc } from 'crypto-js';

export const encrypt = (text: string) =>
  AES.encrypt(text, process.env.REACT_APP_SECRET_KEY!).toString();

export const decrypt = (text: string) =>
  AES.decrypt(text, process.env.REACT_APP_SECRET_KEY!).toString(enc.Utf8);
