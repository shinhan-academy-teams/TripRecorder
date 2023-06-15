import React from "react";
import Memo from "./Sns/Memo";
import S3Upload from "./Sns/S3Upload";
import HashTag from "./Sns/HashTag";
import OpenRangeRadio from "./Sns/OpenRangeRadio";
import BtnSnsRegReset from "./Sns/BtnSnsRegReset";

const RegisterSns = () => {
  return (
    <div>
      <Memo />
      <S3Upload />
      <br />
      <br />
      <HashTag />
      <br />
      <br />
      <OpenRangeRadio />
      <BtnSnsRegReset />
    </div>
  );
};

export default RegisterSns;
