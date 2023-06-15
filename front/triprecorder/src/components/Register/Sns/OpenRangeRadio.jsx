import React, { useState } from "react";
import { Form, Radio, Space } from "antd";

const OpenRangeRadio = () => {
  const [size, setSize] = useState("none");
  return (
    <>
      <Form.Item
        label="공개 범위"
        name="openrange"
        rules={[
          {
            required: true,
            message: "공개범위를 설정해주세요!",
          },
        ]}
      >
        <Radio.Group onChange={setSize} value={size}>
          <Space direction="horizontal" style={{ margin: 5 }}>
            <Radio value={"all"} onClick={() => setSize("all")}>
              전체 공개
            </Radio>
            <Radio value={"follower"} onClick={() => setSize("follower")}>
              팔로워 공개
            </Radio>
            <Radio value={"none"} onClick={() => setSize("none")}>
              비공개
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default OpenRangeRadio;
