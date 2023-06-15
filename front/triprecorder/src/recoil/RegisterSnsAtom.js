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
