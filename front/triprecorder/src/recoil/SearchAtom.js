import { atom } from "recoil";

// 닉네임 검색 사용자 리스트
export const NicknameUserAtom = atom({
  key: "NicknameUserAtom",
  default: [],
});

// 해시태그 검색 게시글 리스트
export const HashtagSnsAtom = atom({
  key: "HashtagSnsAtom",
  default: [],
});
