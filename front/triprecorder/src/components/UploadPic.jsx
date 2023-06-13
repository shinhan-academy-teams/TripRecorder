import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload, Form } from "antd";

const UploadPic = () => {
  return (
    <>
      <Form.Item
        label="사진"
        name="pictures"
        rules={[
          {
            required: true,
            message: "사진을 업로드 해주세요!",
          },
        ]}
      >
        <Space
          direction="horizontal"
          style={{
            width: "80%",
          }}
          size="large"
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            maxCount={5} //다섯장까지
            multiple
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Space>
      </Form.Item>
    </>
  );
};

export default UploadPic;
