import React from "react";
import CashCardRadio from "./Exp/CashCardRadio";
// import Receipt from "./Exp/Receipt";
// import WhereToUse from "./Exp/WhereToUse";
// import Address from "./Exp/Address";
// import TripExp from "./Exp/TripExp";
// import DateTime from "./Exp/DateTime";
// import Category from "./Exp/Category";
// import { Button } from "antd";
// import BtnRegReset from "./Exp/BtnExpRegReset";
import "style/register.scss";
import logo from "assets/tripRecorder.png";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import authService from "api/auth.service";
// import { Form } from "antd";

const RegisterExp = () => {
  const onFinish = (values) => {
    //values : DB에 저장할 입력값
    console.log("Success:", values);

    if (values["paymentMethod"] === "card") {//카드
      authService.ResigerExpCard(
        
      ).then().catch();

    } else {//현금
      console.log("캐시");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="divbox">
      <img alt="tripRecorder" src={logo} className="logoimg" />
      <small style={{ color: "#9CA3AF", paddingBottom: 10 }}>
        여행 경비 및 게시글을 등록하세요.
      </small>
      <div className="divform">
        <Form
          name="basic"
          style={{
            maxWidth: 450,
            margin: "0 auto",
          }}
          initialValues={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Button type="dashed" style={{ margin: 5 }}>
            영수증 등록
          </Button>

          <br />

          <CashCardRadio />

          <Form.Item
            label="사용처"
            name="whereToUse"
            rules={[
              {
                required: true,
                message: "사용처를 입력해주세요!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="장소"
            name="address"
            rules={[
              {
                required: true,
                message: "장소를 입력해주세요!",
              },
            ]}
          >
            <Input />
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
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            label="날짜+시간"
            name="dateTime"
            rules={[
              {
                required: true,
                message: "결제 날짜/시간을 설정해주세요!",
              },
            ]}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm"
              // disabledTime={disabledDateTime}
              showTime={{
                defaultValue: dayjs("00:00", "HH:mm"),
              }}
            />
          </Form.Item>

          <Form.Item
            label="카테고리"
            name="category"
            rules={[
              {
                required: true,
                message: "사용 카테고리를 입력해주세요!",
              },
            ]}
          >
            <Select>
              <Select.Option value="숙박">숙박</Select.Option>
              <Select.Option value="교통">교통</Select.Option>
              <Select.Option value="관광">관광</Select.Option>
              <Select.Option value="쇼핑">쇼핑</Select.Option>
              <Select.Option value="식비">식비</Select.Option>
              <Select.Option value="항공">항공</Select.Option>
            </Select>
          </Form.Item>

          <Button type="dashed" htmlType="submit" style={{ margin: "5px 5px" }}>
            경비 등록
          </Button>
          <Button type="dashed" htmlType="reset" style={{ margin: "5px 5px" }}>
            경비 리셋
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterExp;
