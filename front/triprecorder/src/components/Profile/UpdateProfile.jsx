import React, { useEffect, useState } from "react";
import { Input, Button, Upload, Form, Typography, Space, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { userNo } from "recoil/UserInfo";
import api from "api/axios";

const { Title } = Typography;

const UpdateProfile = () => {
  const [form] = Form.useForm();
  const [profilePicture, setProfilePicture] = useState("");
  const [defaultProfilePicture, setDefaultProfilePicture] = useState(false);
  const [userNum] = useRecoilState(userNo);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    api
      .get("/profile/update/" + userNum)
      .then((res) => {
        const userData = res.data;
        setUserData(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleProfilePictureUpload = (event) => {
    // 프로필 사진 업로드 로직
    // 선택된 파일을 처리하고 프로필 사진 상태 업데이트
  };

  const handleDefaultProfilePicture = () => {
    setDefaultProfilePicture(true);
    setProfilePicture(""); // 프로필 사진 값을 초기화
  };

  const handleSubmit = (values) => {
    // 프로필 수정 제출 로직
    console.log(values);
  };

  useEffect(() => {
    console.log(userData);
  }, []);

  const fields = [
    { name: ["name"], value: userData.userName },
    { name: ["gender"], value: userData.userGender },
    { name: ["nickname"], value: userData.userNick },
    { name: ["email"], value: userData.userEmail },
    { name: ["profileMessage"], value: userData.profileMsg },
  ];
  return (
    <div className="divbox" style={{ height: "850px" }}>
      <Title level={2}>회원 정보 수정</Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        fields={fields}
        style={{ width: "320px", display: "block", margin: "0 auto" }}
      >
        <Form.Item name="name" label="이름">
          <Input style={{ width: "220px" }} />
        </Form.Item>

        <Form.Item name="gender" label="성별">
          <Input style={{ width: "220px" }} />
        </Form.Item>

        <Form.Item name="nickname" label="닉네임">
          <Input style={{ width: "220px" }} />
        </Form.Item>

        <Form.Item name="email" label="이메일">
          <Input type="email" style={{ width: "220px" }} />
        </Form.Item>

        <Form.Item name="profileMessage" label="프로필메시지">
          <Input.TextArea
            autoSize={{ minRows: 4, maxRows: 4 }}
            style={{ width: "190px" }}
          />
        </Form.Item>

        <Form.Item label="프로필사진">
          <Image
            width={180}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <Form.Item name="profilePicture" noStyle>
            <Upload
              name="profilePicture"
              beforeUpload={() => false}
              onChange={handleProfilePictureUpload}
              accept="image/*"
              showUploadList={false}
            >
              <Space direction="horizontal" style={{ margin: 3 }}>
                <Button icon={<UploadOutlined />}>사진 업로드</Button>
              </Space>
            </Upload>
          </Form.Item>
          <Button onClick={handleDefaultProfilePicture}>기본이미지</Button>
          {defaultProfilePicture && (
            <div style={{ color: "red" }}>기본 이미지로 설정되었습니다.</div>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            수정 완료
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProfile;
