import React from "react";
import CashCardRadio from "./Exp/CashCardRadio";
import Receipt from "./Exp/Receipt";
import WhereToUse from "./Exp/WhereToUse";
import Address from "./Exp/Address";
import TripExp from "./Exp/TripExp";
import DateTime from "./Exp/DateTime";
import Category from "./Exp/Category";
// import { Button } from "antd";
import BtnRegReset from "./Exp/BtnExpRegReset";

const RegisterExp = () => {
  return (
    <div>
      <Receipt />
      <CashCardRadio />
      <WhereToUse />
      <Address />
      <TripExp />
      <DateTime />
      <Category />
      <BtnRegReset />
    </div>
  );
};

export default RegisterExp;
