import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import tripRecorder from "assets/tripRecorder.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
const SignIn = (props) => {
  const DivInner = styled.div`
    margin-bottom: 0.75rem;
  `;
  const Footer = styled.div`
    text-align: center;
  `;

  const LoginForm = styled.div`
    display: flex;
    background-color: #f7f6dc;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
    width: 26rem;
    height: 42rem;
  `;

  // const Input = styled.input`
  //   display: block;
  //   padding-top: 0.25rem;
  //   padding-bottom: 0.25rem;
  //   padding-left: 0.375rem;
  //   padding-right: 0.375rem;
  //   color: #6b7280;
  //   width: 100%;
  //   border-radius: 0.375rem;
  //   border-width: 1px;
  //   border-color: #d1d5db;
  //   background-color: #d9d9d9;
  // `;
  const Label = styled.label`
    display: inline;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 600;
  `;
  // const Button = styled.button`
  //   display: block;
  //   padding-top: 0.375rem;
  //   padding-bottom: 0.375rem;
  //   padding-left: 0.5rem;
  //   padding-right: 0.5rem;
  //   margin-bottom: 0.375rem;
  //   background-color: #7fb77e;
  //   color: #ffffff;
  //   text-align: center;
  //   width: 100%;
  //   border-radius: 0.375rem;

  //   :hover {
  //     background-color: #649364;
  //   }
  // `;
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

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    console.log("Finish:", values);
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
        <small style={{ color: "#9CA3AF" }}>어서오세요 반갑습니다 😊</small>
        {/* Form */}
        <Form
          form={form}
          name="horizontal_login"
          onFinish={onFinish}
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
              name="password"
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
          <DivInner>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="default"
                  style={{ backgroundColor: "#7fb77e", color: "#ffffff" }}
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
    </LoginForm>
  );
};
export default SignIn;
