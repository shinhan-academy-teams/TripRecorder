import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import tripRecorder from "assets/tripRecorder.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, Modal } from "antd";
import Cookies from "js-cookie";
import authService from "api/auth.service";
import { useRecoilState } from "recoil";
import { userNo, userNick, userProfile, isLoggedIn } from "../recoil/UserInfo";

const SignIn = (props) => {
  const [userNum, setUserNum] = useRecoilState(userNo);
  const [userNickName, setUserNickName] = useRecoilState(userNick);
  const [userProf, setUserProf] = useRecoilState(userProfile);
  const [isLog, setIsLog] = useRecoilState(isLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const DivInner = styled.div`
    margin-bottom: 0.75rem;
  `;
  const Footer = styled.div`
    text-align: center;
  `;

  const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f7f6dc;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
    width: 26rem;
    height: 42rem;
  `;

  const Link = styled.a`
    color: #7fb77e;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 600;
  `;
  const ImgComponent = styled.img`
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  `;

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  // let jwtToken = Cookies.get("jwtToken");

  useEffect(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    let user = localStorage.getItem("userNo");
    if (user !== null) {
      setIsLog(true);
    }
  }, [window.localStorage.length]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    await authService
      .login(values["ID"], values["PW"])
      .then((res) => {
        if (res?.status === 200) {
          console.log(res.data);
          console.log(Cookies.get("jwtToken"));

          // localStorage.clear();
          // localStorage.setItem("userNo", res.data.userNo);
          // localStorage.setItem("userNick", res.data.userNick);
          // localStorage.setItem("userProfile", res.data.userProfile);

          window.location.href = "/";
        }
      })
      .catch((err) => {
        // showModal();
        console.log(err, "@@@@@@");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <LoginForm>
      <div style={{ width: "18rem" }}>
        {/* Heading */}
        <h1
          style={{
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
            fontWeight: "600",
          }}
        >
          <Link href="http://localhost:3000/">
            <ImgComponent src={tripRecorder} id="logo" />
          </Link>
        </h1>
        <small
          style={{
            color: "#9CA3AF",
            display: "flex",
            justifyContent: "center",
          }}
        >
          어서오세요 반갑습니다 😊
        </small>
        {/* Form */}
        <Form
          form={form}
          name="horizontal_login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ marginTop: "1rem" }}
          labelCol={{ span: 7 }}
        >
          <DivInner>
            <Form.Item
              label="아이디"
              name="ID"
              rules={[
                {
                  required: true,
                  message: "ID를 적어주세요 !",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="아이디"
              />
            </Form.Item>
          </DivInner>

          <DivInner>
            <Form.Item
              label="비밀번호"
              name="PW"
              rules={[
                {
                  required: true,
                  message: "비밀번호를 적어주세요 !",
                },
              ]}
            >
              <Input.Password
                height="20"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="비밀번호"
              />
            </Form.Item>
          </DivInner>

          <DivInner
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "center",
              justifyContent: "flex-end",
            }}
          >
            <Link href="#">비밀번호 찾기</Link>
          </DivInner>
          <DivInner style={{ display: "flex", justifyContent: "center" }}>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="default"
                  htmlType="submit"
                  style={{
                    backgroundColor: "#7fb77e",
                    color: "#ffffff",
                  }}
                  size="large"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                >
                  로그인{" "}
                </Button>
              )}
            </Form.Item>
          </DivInner>
        </Form>
      </div>
      <Footer>
        <span
          style={{
            color: "#9CA3AF",
            fontSize: "0.75rem",
            lineHeight: "1rem",
            fontWeight: "600",
          }}
        >
          계정이 없나요?{" "}
        </span>
        <Link href="#" onClick={props.handleLoginState}>
          가입하기
        </Link>
      </Footer>
      <Modal
        title="로그인 실패 ! 🤔"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p> 다시 로그인 해주세요 ! 😊</p>
      </Modal>
    </LoginForm>
  );
};
export default SignIn;
