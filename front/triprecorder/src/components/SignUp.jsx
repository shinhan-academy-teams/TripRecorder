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
import { Form, Input, Button, Radio, Select, Space } from "antd";
import authService from "api/auth.service";
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

  const onFinish = async (values) => {
    await authService
      .signup(
        values["ID"],
        values["PW"],
        values["Name"],
        values["Nick"],
        values["email"].key + values["email"].value,
        values["Gender"]
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const [checkIDResult, setCheckIDResult] = useState(false);
  let [ID, setID] = useState("");

  const handleIDChange = async (event) => {
    setID(() => {
      // console.log(event.target.value);
      return event.target.value;
    });
    // console.log(event.target.value);
  };
  useEffect(() => {
    // console.log(ID, "@@@");

    authService.checkDuplicateId(ID).then((res) => {
      // console.log(ID);
      // console.log(res);
      if (res === false) {
        setCheckIDResult(false);
      } else {
        setCheckIDResult(true);
      }
    });

    forceUpdate({});
  }, [ID]);
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
        <small
          style={{
            color: "#9CA3AF",
            display: "flex",
            justifyContent: "center",
          }}
        >
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
              validateStatus={checkIDResult ? "warning" : "success"}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "ID를 적어주세요 !",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                onBlur={handleIDChange}
                value={ID}
                placeholder="너의 ID는"
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
            <Button
              type="default"
              htmlType="submit"
              style={{
                backgroundColor: "#7fb77e",
                color: "#ffffff",
              }}
              onClick={() => {
                if (checkIDResult === false) {
                }
              }}
              size="small"
            >
              ID 중복체크
            </Button>
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
              <Radio.Group size="middle">
                <Radio.Button value="남자">남자</Radio.Button>
                <Radio.Button value="여자">여자</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </DivInner>

          <DivInner>
            <Form.Item
              name="Nick"
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
              name="PW"
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
            <Space.Compact>
              <Form.Item
                label="이메일"
                name={["email", "key"]}
                rules={[
                  {
                    required: true,
                    message: "Email을 적어주세요 !",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  style={{
                    width: "100%",
                  }}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                style={{ textTransform: "lowercase" }}
                name={["email", "value"]}
              >
                <Select placeholder="@naver.com">
                  <Option
                    value="@naver.com"
                    style={{ textTransform: "lowercase" }}
                  >
                    @naver.com
                  </Option>
                  <Option
                    value="@daum.net"
                    style={{ textTransform: "lowercase" }}
                  >
                    @daum.net
                  </Option>
                  <Option
                    value="@gmail.com"
                    style={{ textTransform: "lowercase" }}
                  >
                    @gmail.com
                  </Option>
                  <Option
                    value="@kakao.com"
                    style={{ textTransform: "lowercase" }}
                  >
                    @kakao.com
                  </Option>
                  <Option
                    value="@yahoo.com"
                    style={{ textTransform: "lowercase" }}
                  >
                    @yahoo.com
                  </Option>
                </Select>
              </Form.Item>
            </Space.Compact>
            {/* </Form.Item> */}
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
