import React from "react";
// import { useRecoilValue } from 'recoil';
// import { payMethodAtom } from 'recoil/RegisterExpAtom';
import RegisterExp from "components/Register/RegisterExp";
import RegisterSns from "components/Register/RegisterSns";
import styled from "@emotion/styled";
import logo from "assets/tripRecorder.png";
import { Checkbox, Col, Form, Row } from "antd";
import { useRecoilState } from "recoil";
import { checkExp, checkSns } from "recoil/RegisterAll";

const RegisterAll = () => {
  const DivBox = styled.div`
    position: absolute;
    width: 50%;
    border: 3px solid #7fb77e;
    border-radius: 30px;
    top: 50%;
    left: 50%;
    display: grid;
    align-items: center;
    transform: translate(-30%, -50%);
    text-align: center;
  `;
  const LogoImg = styled.img`
    width: 40%;
    margin: auto;
    padding-top: 35px;
    padding-bottom: 10px;
    display: inline-block;
  `;

  const [componentDisabled1, setComponentDisabled1] = useRecoilState(checkExp);
  const [componentDisabled2, setComponentDisabled2] = useRecoilState(checkSns);
  const onFinish = (values) => {
    //values : DB에 저장할 입력값
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <DivBox>
      <LogoImg alt="tripRecorder" src={logo} />
      <small style={{ color: "#9CA3AF", paddingBottom: 10 }}>
        여행 경비 및 게시글을 등록하세요.
      </small>

      <Row>
        {/* ###########경비######### */}
        <Col span={12}>
          <hr style={{ border: "solid 1.5px #7fb77e" }} />
          <Checkbox
            checked={componentDisabled1}
            onChange={(e) => setComponentDisabled1(e.target.checked)}
          >
            경비 등록
          </Checkbox>
          <hr style={{ border: "solid 1.5px #7fb77e" }} />
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            disabled={!componentDisabled1}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <RegisterExp />
          </Form>
        </Col>
        <Col span={12}>
          <hr style={{ border: "solid 1.5px #7fb77e" }} />
          <Checkbox
            checked={componentDisabled2}
            onChange={(e) => setComponentDisabled2(e.target.checked)}
          >
            게시글 등록
          </Checkbox>
          <hr style={{ border: "solid 1.5px #7fb77e" }} />
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            disabled={!componentDisabled2}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <RegisterSns />
          </Form>
        </Col>
      </Row>
    </DivBox>
  );
};

export default RegisterAll;
