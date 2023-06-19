import { atom } from "recoil";

//S3 업로드 진행률
export const progressAtom = atom({
  key: "progress",
  default: 0,
});

//S3 선택 파일들  --배열로 담김!!
export const filesAtom = atom({
  key: "files",
  default: [],
  dangerouslyAllowMutability: true,
});

//showAlert
export const showAlertAtom = atom({
  key: "showAlert",
  default: false,
});

//공개 범위
export const openRangeAtom = atom({
  key: "openRangeAtom",
  default: 1, //비공개
});

//해시태그 배열
export const tagsAtom = atom({
  key: "tagsAtom",
  default: [],
});

export const inputVisibleAtom = atom({
  key: "inputVisibleAtom",
  default: false,
});

export const inputValueAtom = atom({
  key: "inputValueAtom",
  default: "",
});

export const editInputIndexAtom = atom({
  key: "editInputIndexAtom",
  default: -1,
});

export const editInputValueAtom = atom({
  key: "editInputValueAtom",
  default: "",
});
