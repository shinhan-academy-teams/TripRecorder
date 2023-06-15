import { Form, Input } from "antd";
import React from "react";

const Address = () => {
  return (
    <div>
      <Form.Item
        label="장소"
        name="address"
        rules={[
          {
            required: true,
            message: "장소를 입력해주세요!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </div>
  );
};

export default Address;
