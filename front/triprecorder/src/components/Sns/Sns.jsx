import React from "react";
import Cookies from "js-cookie";
import LogoutSns from "./LogoutSns";
import SnsLogin from "./SnsLogin";

const Sns = () => {
  const token = Cookies.get("jwtToken");

  return (
    <div className="snsbox">
      {token ? <SnsLogin token={token} /> : <LogoutSns />}
    </div>
  );
};

export default Sns;
