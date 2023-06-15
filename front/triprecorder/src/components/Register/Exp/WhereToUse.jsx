import { Form, Input } from "antd";
import React from "react";

const WhereToUse = () => {
  return (
    <div>
      <Form.Item
        label="사용처"
        name="whereToUse"
        rules={[
          {
            required: true,
            message: "사용처를 입력해주세요!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </div>
  );
};

export default WhereToUse;
