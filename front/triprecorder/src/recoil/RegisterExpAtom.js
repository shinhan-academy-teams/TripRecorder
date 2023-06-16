import { atom } from "recoil";

//결제 방식
export const payMethodAtom = atom({
  key: "payMethod", //전역적으로 유일한 값
  default: "cash",
});

//현금, 카드 중에 카드 선택시 카드사, 카드 정보 입력폼 보이기
export const showAtom = atom({
  key: "show",
  default: false,
});

// //카드사 선택시 해당 카드 보이기
// export const cardShowAtom = atom({
//   key: "cardShow",
//   default: "",
// });

export const showBtnAtom = atom({
  key : "showBtn",
  default : false
});

export const cardsAtom = atom({
  key:"cards",
  default : []
});

export const cardNoAtom = atom({
  key:"cardNo",
  default : []
});

export const tripSnsAtom = atom({
  key:"tripSns",
  default : []
});