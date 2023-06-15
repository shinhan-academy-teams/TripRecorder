import { Form, InputNumber } from "antd";
import React from "react";

const TripExp = () => {
  return (
    <div>
      <Form.Item
        label="여행 경비"
        name="tripexpense"
        rules={[
          {
            required: true,
            message: "여행 경비를 입력해주세요!",
          },
        ]}
      >
        <InputNumber
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />
      </Form.Item>
    </div>
  );
};

export default TripExp;
