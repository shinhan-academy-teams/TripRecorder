import { atom } from "recoil";

//결제 방식
export const payMethodAtom = atom({
  key: "payMethod", //전역적으로 유일한 값
  default: "cash",
});

export const cardShow = atom({
  key: "cardShow",
  default: false,
});
