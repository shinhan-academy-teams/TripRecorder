import { Form, Input } from "antd";
import React from "react";

const Memo = () => {
  const { TextArea } = Input;
  return (
    <div>
      <Form.Item label="메모" name="memo">
        <TextArea rows={3} />
      </Form.Item>
    </div>
  );
};

export default Memo;
