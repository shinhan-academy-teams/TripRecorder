import { Button } from "antd";
import React from "react";

const BtnSnsRegReset = () => {
  return (
    <div>
      <Button type="dashed" htmlType="submit" style={{ margin: "5px 5px" }}>
        게시글 등록
      </Button>
      <Button type="dashed" htmlType="reset" style={{ margin: "5px 5px" }}>
        게시글 리셋
      </Button>
    </div>
  );
};

export default BtnSnsRegReset;
