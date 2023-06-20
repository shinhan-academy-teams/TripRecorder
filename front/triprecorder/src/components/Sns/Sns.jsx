import React from "react";
import Cookies from "js-cookie";
import LoginSns from "./LoginSns";
import LogoutSns from "./LogoutSns";

const Sns = () => {
  const token = Cookies.get("jwtToken");

  return (
    <div className="snsbox">
      {token ? <LoginSns token={token} /> : <LogoutSns />}
    </div>
  );
};

export default Sns;
