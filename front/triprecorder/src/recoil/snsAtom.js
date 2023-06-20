import { atom } from "recoil";

//로그인 했을때 모든 데이터
export const allDataAtom = atom({
  key: "allDataAtom",
  default: [],
});

