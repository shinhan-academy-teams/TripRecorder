import { useState } from "react";
import styled from "@emotion/styled";
import {
  Col,
  Row,
  Checkbox,
  Form,
  // Radio,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
} from "antd";
import dayjs from "dayjs";
// import UploadPic from "components/UploadPic";
import HashTag from "components/HashTag";
import CashCardRadio from "components/CashCardRadio";
import logo from "assets/tripRecorder.png";
import OpenRangeRadio from "components/OpenRangeRadio";
import S3Upload from "components/S3Upload";

const RegistrationAll = () => {
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

  const { TextArea } = Input;
  const [componentDisabled1, setComponentDisabled1] = useState(true);
  const [componentDisabled2, setComponentDisabled2] = useState(true);
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(), //splice(4, 20) : 4~비활성화
    disabledMinutes: () => range(), //range(30, 60) : 30~비활성화
  });

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
                disabledTime={disabledDateTime}
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

            <Button
              type="dashed"
              htmlType="submit"
              style={{ margin: "5px 5px" }}
            >
              경비 등록
            </Button>
            <Button
              type="dashed"
              htmlType="reset"
              style={{ margin: "5px 5px" }}
            >
              경비 리셋
            </Button>
          </Form>
        </Col>

        {/* ###########게시글######### */}
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
            <Form.Item label="메모" name="memo">
              <TextArea rows={3} />
            </Form.Item>

            {/* 사진 업로드 - 여러장 리스트로 값 전달 받기*/}
            {/* <UploadPic /> */}
            <S3Upload />
            <br />
            <br />

            {/* 해시 태그 - 해시태그 여러개 리스트로 전달 받기 */}
            <HashTag />
            <br />
            <br />
            {/* 공개 범위 */}
            <OpenRangeRadio />
            <br />
            <br />
            <Button
              type="dashed"
              htmlType="submit"
              style={{ margin: "5px 5px" }}
            >
              게시글 등록
            </Button>
            <Button
              type="dashed"
              htmlType="reset"
              style={{ margin: "5px 5px" }}
            >
              게시글 리셋
            </Button>
          </Form>
        </Col>
      </Row>
    </DivBox>
  );
};

export default RegistrationAll;
