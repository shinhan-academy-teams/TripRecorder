import { atom } from "recoil";

// 닉네임 검색 사용자 리스트
export const LocalUserNickAtom = atom({
  key: "LocalUserNickAtom",
  default: localStorage.getItem("userNick") || "",
});
export const LocalUserProfileAtom = atom({
  key: "LocalUserProfileAtom",
  default: localStorage.getItem("userProfile") || "",
});
