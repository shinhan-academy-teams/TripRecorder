import { useState } from "react";
import styled from "@emotion/styled";
import {
  Col,
  Row,
  Checkbox,
  Form,
  Radio,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Button,
} from "antd";
import dayjs from "dayjs";
import UploadPic from "components/UploadPic";
import HashTag from "components/HashTag";

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
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
  });
  const [size, setSize] = useState("none");
  return (
    <DivBox>
      <Row>
        <Col span={12}>
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
          >
            <Button type="dashed">영수증 등록</Button>

            <Form.Item label="결제 방식">
              <Radio.Group>
                <Radio value="cash"> 현금 </Radio>
                <Radio value="card"> 카드 </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="사용처">
              <Input />
            </Form.Item>

            <Form.Item label="장소">
              <Input />
            </Form.Item>

            <Form.Item label="지출">
              <InputNumber />
            </Form.Item>

            <Form.Item label="날짜+시간">
              <DatePicker
                format="YYYY-MM-DD HH:mm"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                showTime={{
                  defaultValue: dayjs("00:00", "HH:mm"),
                }}
              />
            </Form.Item>

            {/* 현금이라면 보이지 않음 */}
            <Form.Item label="카드사">
              <Input />
            </Form.Item>

            <Form.Item label="결제 카드">
              <Select>
                <Select.Option value="a">a카드</Select.Option>
                <Select.Option value="b">b카드</Select.Option>
                <Select.Option value="c">c카드</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="카테고리">
              <Select>
                <Select.Option value="숙박">숙박</Select.Option>
                <Select.Option value="교통">교통</Select.Option>
                <Select.Option value="관광">관광</Select.Option>
                <Select.Option value="쇼핑">쇼핑</Select.Option>
                <Select.Option value="식비">식비</Select.Option>
                <Select.Option value="항공">항공</Select.Option>
              </Select>
            </Form.Item>

            <Button type="dashed" style={{ margin: "5px 5px" }}>
              경비 등록
            </Button>
            <Button type="dashed" style={{ margin: "5px 5px" }}>
              경비 리셋
            </Button>
          </Form>
        </Col>

        <Col span={12}>
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
          >
            <Form.Item label="메모">
              <TextArea rows={3} />
            </Form.Item>

            {/* 사진 업로드 */}
            <UploadPic />
            <br />
            <br />
            {/* 해시 태그 */}
            <HashTag />
            <br />
            <br />
            <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
              <Radio.Button value="all">전체 공개</Radio.Button>
              <Radio.Button value="fallower">팔로워 공개</Radio.Button>
              <Radio.Button value="none">비공개</Radio.Button>
            </Radio.Group>

            <br />
            <br />
            <Button type="dashed" style={{ margin: "5px 5px" }}>
              게시글 등록
            </Button>
            <Button type="dashed" style={{ margin: "5px 5px" }}>
              게시글 리셋
            </Button>
          </Form>
        </Col>
      </Row>
    </DivBox>
  );
};

export default RegistrationAll;
