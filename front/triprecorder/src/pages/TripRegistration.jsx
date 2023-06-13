import React from "react"; //, { useState }
import logo from "assets/tripRecorder.png";
import styled from "@emotion/styled";
import { DatePicker, Form, Input, InputNumber } from "antd";

const { RangePicker } = DatePicker;
const TripRegistration = (props) => {
  const DivBox = styled.div`
    position: absolute;
    width: 40%;
    border: 3px solid #7fb77e;
    border-radius: 30px;
    top: 50%;
    left: 50%;
    display: grid;
    align-items: center;
    transform: translate(-20%, -50%);
    text-align: center;
  `;
  const LogoImg = styled.img`
    width: 40%;
    margin: auto;
    padding-top: 35px;
    padding-bottom: 10px;
    display: inline-block;
  `;
  const Btn = styled.button`
    background: #7fb77e;
    margin: 25px auto;
    display: inline-block;
    padding: 15px 30px;
    border-radius: 20px;
    border: none;
    color: #f7f6dc;
    font: bold;
  `;

  const onFinish = (values) => {
    //values : DB에 저장할 입력값
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (value) => {
    console.log("changed", value);
  };
  return (
    <DivBox>
      <LogoImg alt="tripRecorder" src={logo} />
      <small style={{ color: "#9CA3AF", paddingBottom: 10 }}>
        여행 카테고리를 등록하세요.
      </small>

      <Form
        name="basic"
        style={{
          maxWidth: 600,
          margin: "auto",
        }}
        initialValues={{
          remember: true,
          tripexpense: 1000,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="여행 이름"
          name="tripname"
          rules={[
            {
              required: true,
              message: "여행 이름을 입력해주세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="여행지"
          name="tripspace"
          rules={[
            {
              required: true,
              message: "여행지를 입력해주세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="여행 기간"
          name="tripperiod"
          rules={[
            {
              required: true,
              message: "여행 기간을 설정해주세요!",
            },
          ]}
        >
          <RangePicker renderExtraFooter={() => "extra footer"} />
        </Form.Item>

        <Form.Item
          label="여행 경비"
          name="tripexpense"
          rules={[
            {
              required: true,
              message: "여행 경비를 입력해주세요!",
            },
          ]}
        >
          <InputNumber
            // defaultValue={1000}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={onChange}
          />
        </Form.Item>
        <Btn htmlType="submit">Submit</Btn>
      </Form>
    </DivBox>
  );
};

export default TripRegistration;
