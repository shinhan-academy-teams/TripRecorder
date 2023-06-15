import { Form, Select } from "antd";
import React from "react";

const Category = () => {
  return (
    <div>
      <Form.Item
        label="카테고리"
        name="category"
        rules={[
          {
            required: true,
            message: "사용 카테고리를 입력해주세요!",
          },
        ]}
      >
        <Select>
          <Select.Option value="숙박">숙박</Select.Option>
          <Select.Option value="교통">교통</Select.Option>
          <Select.Option value="관광">관광</Select.Option>
          <Select.Option value="쇼핑">쇼핑</Select.Option>
          <Select.Option value="식비">식비</Select.Option>
          <Select.Option value="항공">항공</Select.Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default Category;
