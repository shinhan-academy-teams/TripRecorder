import { atom } from "recoil";

// 인기 카드 리스트
export const cardListAtom = atom({
  key: "cardListAtom",
  default: [],
});

// 카테고리 변경
export const categoryAtom = atom({
  key: "categoryAtom",
  default: "쇼핑",
});

// 혜택 리스트
export const benefitListAtom = atom({
  key: "benefitListAtom",
  default: [],
});
