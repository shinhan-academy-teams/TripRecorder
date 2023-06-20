import { atom, selector } from "recoil";

// 전역 상태를 저장하는 Recoil atom 생성
export const imagesState = atom({
  key: "imagesState",
  default: [], // 기본값
});

// 전역 함수를 생성하는 Recoil selector 생성
export const imagesSelector = selector({
  key: "imagesSelector",
  get: ({ get }) => {
    const fn = get(imagesState);

    return (args) => {
      // 전역 함수 내용을 구현하세요
      console.log("전역 함수가 실행되었습니다!", args);
      return fn(args);
    };
  },
});
