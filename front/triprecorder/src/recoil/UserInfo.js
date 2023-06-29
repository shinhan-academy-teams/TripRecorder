import { atom } from "recoil";

export const userNo = atom({
  key: "userNo",
  default: "",
});

export const userNick = atom({
  key: "userNick",
  default: "",
});

export const userProfile = atom({
  key: "userProfile",
  default: "",
});

export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: false,
});
export const ModalOpen = atom({
  key: "ModalOpen",
  default: false,
});

export const isshow = atom({
  key: "isshow",
  default: true,
});
