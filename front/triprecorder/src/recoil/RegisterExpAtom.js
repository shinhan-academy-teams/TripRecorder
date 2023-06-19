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

//영수증 s3
export const ReceiptAtom = atom({
  key : "receipt",
  default : [],
  dangerouslyAllowMutability: true,
});

//영수증에서 추출한 데이터
export const ReceiptDataAtom = atom({
  key:"receiptData",
  default : {}
});

//사용처 상태
export const expPlaceAtom = atom({
  key : "expPlaceAtom",
  default : ''
});

// 주소 상태
export const expAddressAtom = atom({
  key : "expAddressAtom",
  default : ''
});

//경비 상태
export const expMoneyAtom = atom({
  key : "expMoneyAtom",
  default : ''
});

//날짜+시간 상태
export const dateTimeAtom = atom({
  key : "dateTimeAtom",
  default : ''
});