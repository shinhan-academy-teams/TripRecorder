import { Form, Input, Radio, Select, Space } from "antd";
import { useState } from "react";

const CashCardRadio = () => {
  const [value, setValue] = useState("cash");

  const [show, setShow] = useState(false);

  return (
    <>
      <Form.Item
        label="결제 방식"
        name="paymentMethod"
        rules={[
          {
            required: true,
            message: "",
          },
        ]}
      >
        <Radio.Group onChange={setValue} value={value}>
          <Space direction="horizontal" style={{ margin: 5 }}>
            <Radio value={"cash"} onClick={() => setShow(false)}>
              현금
            </Radio>
            <Radio value={"card"} onClick={() => setShow(true)}>
              카드
            </Radio>
          </Space>

          {show && (
            <div id="divshow">
              <Form.Item
                label="카드사"
                name="cardcompany"
                rules={[
                  {
                    required: true,
                    message: "카드사를 입력해주세요!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="결제 카드"
                name="card"
                rules={[
                  {
                    required: true,
                    message: "결제 카드를 입력해주세요!",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="a">a카드</Select.Option>
                  <Select.Option value="b">b카드</Select.Option>
                  <Select.Option value="c">c카드</Select.Option>
                </Select>
              </Form.Item>
            </div>
          )}
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default CashCardRadio;
