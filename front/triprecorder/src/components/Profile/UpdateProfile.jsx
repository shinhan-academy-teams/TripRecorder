import React, { useEffect, useState } from "react";
import { Input, Button, Upload, Form, Typography, Space, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "api/axios";
import { useNavigate, useParams } from "react-router-dom";
import AWS from "aws-sdk";
import { useRecoilState } from "recoil";
import { ProfileAtom, keyAtom } from "recoil/Profile";
import authService from "api/auth.service";
import logo from "assets/tripRecorder.png";
import {
  LocalUserNickAtom,
  LocalUserProfileAtom,
} from "recoil/LocalStorageAtom";

// const { Title } = Typography;

const UpdateProfile = () => {
  const [form] = Form.useForm();
  // const [profilePicture, setProfilePicture] = useState("no");
  const [defaultProfilePicture, setDefaultProfilePicture] = useState(false);
  const { userNo } = useParams();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [userNick, setUserNick] = useRecoilState(LocalUserNickAtom);
  const [userProfile, setUserProfile] = useRecoilState(LocalUserProfileAtom);

  //s3에 저장
  const [selectedPhoto, setSelectedPhoto] = useRecoilState(ProfileAtom); //주소
  const [photoKey, setPhotoKey] = useRecoilState(keyAtom); //키
  const ACCESS_KEY = "AKIA2FRRYIXGMZUAI6VM"; //iam에 있음
  const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "trip-recorder"; //s3버킷 네임

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  //데이터 가져오기
  useEffect(() => {
    api
      .get("/profile/update/" + userNo)
      .then((res) => {
        const userData = res.data;
        setUserData(userData);
        setSelectedPhoto(userData.profilePhoto);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleProfilePictureUpload = (e) => {
    // 프로필 사진 업로드 로직
    // 선택된 파일을 처리하고 프로필 사진 상태 업데이트

    const params = {
      ACL: "public-read",
      Body: e.file,
      Bucket: S3_BUCKET,
      Key: "profile/" + e.file.name,
    };
    myBucket
      .putObject(params)
      .on("httpUploadProgress", () => {})
      .send((err) => {
        if (err) console.log(err);
      });

    setSelectedPhoto(
      "https://trip-recorder.s3.ap-northeast-2.amazonaws.com/profile/" +
        e.file.name
    );

    setPhotoKey("profile/" + e.file.name);
    console.log("사진 : ", selectedPhoto);
  };

  const handleDefaultProfilePicture = () => {
    setDefaultProfilePicture(true);
    setSelectedPhoto(
      "https://trip-recorder.s3.ap-northeast-2.amazonaws.com/profile/default_profile.png"
    ); // 기본이미지로 수정
    setPhotoKey(""); //기본이미지 키
  };

  // const handleSubmit = (values) => {
  //   // 프로필 수정 제출 로직
  //   console.log(values);
  // };

  useEffect(() => {
    console.log("처음 데이터", userData);
  }, [userData]);

  const submitData = (values) => {
    //데이터 저장
    console.log("성공 : ", values);

    authService
      .UpdateProfile(
        userNo,
        values["name"],
        values["nickname"],
        values["email"],
        values["gender"],
        photoKey,
        values["profileMessage"]
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("userNick", res.data.userNick);
        localStorage.setItem("userProfile", res.data.userProfile);
        setUserNick(res.data.userNick);
        setUserProfile(res.data.userProfile);
        navigate("/" + res.data.userNick);
      })
      .catch((err) => console.log(err));
  };

  const fields = [
    { name: ["name"], value: userData.userName },
    { name: ["gender"], value: userData.userGender },
    { name: ["nickname"], value: userData.userNick },
    { name: ["email"], value: userData.userEmail },
    { name: ["profileMessage"], value: userData.profileMsg },
  ];
  return (
    <div className="divbox">
      <img alt="tripRecorder" src={logo} className="logoimg" />
      <small style={{ color: "#9CA3AF", paddingBottom: 50 }}>
        회원 정보를 수정하세요.
      </small>
      <Form
        form={form}
        onFinish={submitData}
        fields={fields}
        style={{
          display: "block",
          maxWidth: 500,
          margin: "0 auto",
        }}
      >
        <Form.Item
          name="profileImg"
          style={{
            padding: "20px",
            border: "2px dashed grey",
            borderRadius: "10%",
          }}
        >
          <Image
            width={180}
            src={selectedPhoto !== "no" ? selectedPhoto : ""}
          />
          <Form.Item name="profilePicture" style={{ margin: "10px" }}>
            <div></div>
            <Upload
              name="profilePicture"
              beforeUpload={() => false}
              onChange={handleProfilePictureUpload}
              // onClick={() => uploadFile(selectedPhoto)}
              // accept="image/*"
              // showUploadList={false}
            >
              <Space direction="horizontal" style={{ margin: 3 }}>
                <Button icon={<UploadOutlined />}>사진 업로드</Button>
                <Button onClick={handleDefaultProfilePicture}>
                  기본이미지
                </Button>
                {defaultProfilePicture && (
                  <div style={{ color: "red" }}>
                    기본 이미지로 설정되었습니다.
                  </div>
                )}
              </Space>
            </Upload>
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="name"
          label="이름"
          rules={[
            {
              required: true,
              message: "이름을 작성해주세요",
            },
          ]}
        >
          <Input style={{ width: "220px" }} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="성별"
          rules={[
            {
              required: true,
              message: "성별을 작성해주세요",
            },
          ]}
        >
          <Input style={{ width: "220px" }} />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="닉네임"
          rules={[
            {
              required: true,
              message: "닉네임을 작성해주세요",
            },
          ]}
        >
          <Input style={{ width: "220px" }} />
        </Form.Item>

        <Form.Item
          name="email"
          label="이메일"
          rules={[
            {
              required: true,
              message: "이메일을 작성해주세요",
            },
          ]}
        >
          <Input type="email" style={{ width: "220px" }} />
        </Form.Item>

        <Form.Item name="profileMessage" label="프로필메시지">
          <Input.TextArea
            autoSize={{ minRows: 4, maxRows: 4 }}
            style={{ width: "190px" }}
          />
        </Form.Item>

        <Button
          type="dashed"
          htmlType="submit"
          style={{ margin: "5px 5px" }}
          //onClick={handleProfilePictureUpload}
        >
          수정 완료
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProfile;
