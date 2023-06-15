import { Button } from "antd";
import React from "react";

const BtnRegReset = () => {
  return (
    <div>
      <Button type="dashed" htmlType="submit" style={{ margin: "5px 5px" }}>
        경비 등록
      </Button>
      <Button type="dashed" htmlType="reset" style={{ margin: "5px 5px" }}>
        경비 리셋
      </Button>
    </div>
  );
};

export default BtnRegReset;
