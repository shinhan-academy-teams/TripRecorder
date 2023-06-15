import { Form, Radio, Select, Space } from "antd";
import { useRecoilState } from "recoil";
import { cardShowAtom, payMethodAtom, showAtom } from "recoil/RegisterExpAtom";

const CashCardRadio = () => {
  const [value, setValue] = useRecoilState(payMethodAtom);
  const [show, setShow] = useRecoilState(showAtom);
  const [showCard, setShowCard] = useRecoilState(cardShowAtom);

  const selectCard = (cards) => {
    console.log(cards);
    setShowCard(cards);
  };
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
            <div id="divshow" style={{ display: "block" }}>
              <Form.Item
                label="카드사"
                name="cardcompany"
                rules={[
                  {
                    required: true,
                    message: "카드사를 골라주세요!",
                  },
                ]}
                onChange={selectCard}
              >
                <Select
                  showSearch
                  style={{
                    width: 200,
                  }}
                  placeholder="선택 안함"
                  optionFilterProp="children"
                  // filterOption={(input, option) =>
                  //   (option?.label ?? "").includes(input)
                  // }
                  // filterSort={(optionA, optionB) =>
                  //   (optionA?.label ?? "")
                  //     .toLowerCase()
                  //     .localeCompare((optionB?.label ?? "").toLowerCase())
                  // }
                  value={selectCard}
                  options={[
                    {
                      value: "shinhan",
                      label: "신한",
                    },
                    {
                      value: "kb",
                      label: "국민",
                    },
                    {
                      value: "nh",
                      label: "농협",
                    },
                    {
                      value: "hana",
                      label: "하나",
                    },
                    {
                      value: "woori",
                      label: "우리",
                    },
                    {
                      value: "ibk",
                      label: "기업",
                    },
                    {
                      value: "samsung",
                      label: "삼성",
                    },
                    {
                      value: "hd",
                      label: "현대",
                    },
                    {
                      value: "lotte",
                      label: "롯데",
                    },
                  ]}
                />
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
                {showCard.length > 0 ? (
                  <Select>
                    <Select.Option value="a">a카드</Select.Option>
                    <Select.Option value="b">b카드</Select.Option>
                    <Select.Option value="c">c카드</Select.Option>
                  </Select>
                ) : (
                  <Select></Select>
                )}
              </Form.Item>
            </div>
          )}
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default CashCardRadio;
