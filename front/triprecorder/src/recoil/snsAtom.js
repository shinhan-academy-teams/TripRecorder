import { atom } from "recoil";

export const photoAtom = atom({
  key: "photoDataAtom",
  default: [],
});

export const allDataAtom = atom({
  key: "allDataAtom",
  default: [],
});

//댓글
export const repDataAtom = atom({
  key: "repDataAtom",
  default: "",
});
