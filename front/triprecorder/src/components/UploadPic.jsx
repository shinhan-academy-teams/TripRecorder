import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload } from "antd";

const UploadPic = () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
      size="large"
    >
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture"
        maxCount={5}
        multiple
      >
        <Button icon={<UploadOutlined />}>Upload (Max: 5)</Button>
      </Upload>
    </Space>
  );
};

export default UploadPic;
