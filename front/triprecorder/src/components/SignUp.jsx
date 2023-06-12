import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import tripRecorder from "assets/tripRecorder.png";
import {
  LockOutlined,
  UserOutlined,
  IdcardOutlined,
  SmileOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  // Dropdown,
  // Space,
  Radio,
  Select,
  // Cascader,
} from "antd";
const { Option } = Select;
const SignUp = (props) => {
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

  //   const Input = styled.input`
  //     display: block;
  //     padding-top: 0.25rem;
  //     padding-bottom: 0.25rem;
  //     padding-left: 0.375rem;
  //     padding-right: 0.375rem;
  //     color: #6b7280;
  //     width: 100%;
  //     border-radius: 0.375rem;
  //     border-width: 1px;
  //     border-color: #d1d5db;
  //     background-color: #d9d9d9;
  //   `;
  // const Label = styled.label`
  //   display: block;
  //   margin-bottom: 0.5rem;
  //   font-size: 0.75rem;
  //   line-height: 1rem;
  //   font-weight: 600;
  // `;
  //   const Button = styled.button`
  //     display: block;
  //     padding-top: 0.375rem;
  //     padding-bottom: 0.375rem;
  //     padding-left: 0.5rem;
  //     padding-right: 0.5rem;
  //     margin-bottom: 0.375rem;
  //     background-color: #7fb77e;
  //     color: #ffffff;
  //     text-align: center;
  //     width: 100%;
  //     border-radius: 0.375rem;

  //     :hover {
  //       background-color: #649364;
  //     }
  //   `;
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
  const selectAfter = (
    <Select defaultValue="@naver.com">
      <Option value="@daum.net">@daum.net</Option>
      <Option value="@gmail.com">@gmail.com</Option>
      <Option value="@kakao.com">@kakao.com</Option>
      <Option value="@yahoo.com">@yahoo.com</Option>
    </Select>
  );

  return (
    <LoginForm>
      <div style={{ width: "22rem" }}>
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
        <small style={{ color: "#9CA3AF" }}>
          당신의 지갑을 지켜주는 여행용 SNS 플랫폼 TripRecoder
        </small>
        {/* Form */}
        <Form
          form={form}
          name="horizontal_login"
          onFinish={onFinish}
          style={{ marginTop: "1rem" }}
          labelCol={{ span: 8 }}
        >
          <DivInner>
            <Form.Item
              name="ID"
              label="아이디"
              rules={[
                {
                  required: true,
                  message: "ID를 적어주세요 !",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="너의 ID는"
              />
            </Form.Item>
          </DivInner>

          <DivInner>
            <Form.Item
              name="Name"
              label="이름"
              rules={[
                {
                  required: true,
                  message: "이름을 적어주세요 !",
                },
              ]}
            >
              <Input
                prefix={<IdcardOutlined className="site-form-item-icon" />}
                placeholder="너의 Name은"
              />
            </Form.Item>
          </DivInner>

          <DivInner>
            <Form.Item
              name="Gender"
              label="성별"
              rules={[
                {
                  required: true,
                  message: "성별을 적어주세요 !",
                },
              ]}
            >
              <Radio.Group defaultValue="a" size="middle">
                <Radio.Button value="man">남성</Radio.Button>
                <Radio.Button value="woman">여성</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </DivInner>

          <DivInner>
            <Form.Item
              name="NicName"
              label="닉네임"
              rules={[
                {
                  required: true,
                  message: "닉네임을 적어주세요 !",
                },
              ]}
            >
              <Input
                prefix={<SmileOutlined className="site-form-item-icon" />}
                placeholder="너의 NicName은"
              />
            </Form.Item>
          </DivInner>

          <DivInner>
            <Form.Item
              name="password"
              label="비밀번호"
              rules={[
                {
                  required: true,
                  message: "비밀번호를 적어주세요 !",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
          </DivInner>

          <DivInner>
            <Form.Item
              name="pwconfirm"
              label="비밀번호 확인"
              rules={[
                {
                  required: true,
                  message: "비밀번호 한번 더 적어주세요 !",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="비밀번호 확인"
              />
            </Form.Item>
          </DivInner>

          <DivInner>
            <Form.Item
              name="Email"
              label="이메일"
              rules={[
                {
                  required: true,
                  message: "이메일을 적어주세요 !",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                addonAfter={selectAfter}
                type="email"
                placeholder="이메일"
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
                  가입하기
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
          계정이 있나요?{" "}
        </span>
        <Link href="#" onClick={props.handleLoginState}>
          로그인
        </Link>
      </Footer>
    </LoginForm>
  );
};
export default SignUp;
