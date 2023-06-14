import React from "react"; //, { useState }
import logo from "assets/tripRecorder.png";
import styled from "@emotion/styled";
import { DatePicker, Form, Input, InputNumber } from "antd";
import authService from "api/auth.service";
// import dayjs from "dayjs";

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

  const onFinish = async (values) => {
    //values : DB에 저장할 입력값
    console.log("Success:", values);
    const tripStart = values["tripperiod"][0];
    const tripEnd = values["tripperiod"][1];
    // console.log(tripStart.$y);
    if (tripStart.$M + 1 < 10) {
      var tripStartM = "0" + (tripStart.$M + 1);
    } else {
      tripStartM = tripStart.$M + 1;
    }
    if (tripStart.$D < 10) {
      var tripStartD = "0" + tripStart.$D;
    } else {
      tripStartD = tripStart.$D;
    }

    if (tripEnd.$M + 1 < 10) {
      var tripEndM = "0" + (tripEnd.$M + 1);
    } else {
      tripEndM = tripEnd.$M + 1;
    }
    if (tripEnd.$D < 10) {
      var tripEndD = "0" + tripEnd.$D;
    } else {
      tripEndD = tripEnd.$D;
    }
    const tripStart_str =
      tripStart.$y + "-" + tripStartM + "-" + tripStartD + "T00:00:00.000Z";
    const tripEnd_str =
      tripEnd.$y + "-" + tripEndM + "-" + tripEndD + "T00:00:00.000Z";
    console.log(tripStart_str);
    console.log(tripEnd_str);
    await authService
      .TripRegistration(
        values["tripName"],
        values["tripDest"],
        tripStart_str,
        tripEnd_str,
        values["tripExp"]
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const onChange = (value) => {
  //   console.log("changed", value);
  // };

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
          name="tripName"
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
          name="tripDest"
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
          name="tripExp"
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
            // onChange={onChange}
          />
        </Form.Item>
        <Btn htmlType="submit">Submit</Btn>
      </Form>
    </DivBox>
  );
};

export default TripRegistration;
