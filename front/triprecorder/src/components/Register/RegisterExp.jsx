import React, { useEffect } from "react";
import "style/register.scss";
import logo from "assets/tripRecorder.png";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  Space,
  message,
} from "antd";

import dayjs from "dayjs";
import authService from "api/auth.service";
import { useRecoilState } from "recoil";
import {
  cardsAtom,
  payMethodAtom,
  showAtom,
  showBtnAtom,
  tripSnsAtom,
} from "recoil/RegisterExpAtom";
import Receipt from "./Exp/Receipt";
import axios from "axios";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";

const { Option } = Select;
const RegisterExp = () => {
  const [value, setValue] = useRecoilState(payMethodAtom);
  const [show, setShow] = useRecoilState(showAtom); //카드선택시 select 출력
  const [showBtn, setShowBtn] = useRecoilState(showBtnAtom); //데이터 추출 버튼 보이기
  const [cards, setCards] = useRecoilState(cardsAtom); //카드 이름
  const [tripSns, setTripSns] = useRecoilState(tripSnsAtom); //게시글

  useEffect(() => {
    axios
      .post("/card/list")
      .then((res) => {
        const cardData = res.data;
        setCards(cardData.map((card) => card));
      })
      .catch((err) => console.log("error", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps

    axios
      .post("/sns/list/4")
      .then((res) => {
        const snsData = res.data;
        setTripSns(snsData.map((sns) => sns));
      })
      .catch((err) => console.log("error : ", err));
  }, []);

  const onFinish = (values) => {
    //values : DB에 저장할 입력값
    console.log("Success:", values);

    const datePasing = (d) => {
      const dateTime = d;
      if (dateTime.$M + 1 < 10) {
        var dateTimeM = "0" + (dateTime.$M + 1);
      } else {
        dateTimeM = dateTime.$M + 1;
      }
      if (dateTime.$D < 10) {
        var dateTimeD = "0" + dateTime.$D;
      } else {
        dateTimeD = dateTime.$D;
      }
      if (dateTime.$H < 10) {
        var dateTimeH = "0" + dateTime.$H;
      } else {
        dateTimeH = dateTime.$H;
      }
      if (dateTime.$m < 10) {
        var dateTimem = "0" + dateTime.$m;
      } else {
        dateTimem = dateTime.$m;
      }
      const dateTime_str =
        dateTime.$y +
        "-" +
        dateTimeM +
        "-" +
        dateTimeD +
        "T" +
        dateTimeH +
        ":" +
        dateTimem +
        ":00.000Z";
      return dateTime_str;
    };

    var cardCash = "";
    if (values["expWay"] === "card") {
      //카드선택시 axios
      const dateTime = datePasing(values["dateTime"]);
      cardCash = values["card"];
      authService
        .ResigerExpCard(
          4,
          values["sns"],
          cardCash,
          values["expTitle"],
          values["expPlace"],
          values["expAddress"],
          values["expMoney"],
          dateTime, //날짜 시간
          values["expWay"],
          values["expCate"]
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      //현금선택시 axios
      const dateTime = datePasing(values["dateTime"]);
      cardCash = "";
      authService
        .RegisterExpCash(
          4,
          values["sns"],
          cardCash,
          values["expTitle"],
          values["expPlace"],
          values["expAddress"],
          values["expMoney"],
          dateTime, //날짜 시간
          values["expWay"],
          values["expCate"]
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //
  const handleCardChange = (value) => {
    console.log(value);
  };

  const handleFileUpload = (info) => {
    const { status, name } = info.file;
    if (status === 'done') {
      message.success(`${name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${name} file upload failed.`);
    }
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
          {/* 경비 제목 */}
          <Form.Item
            label="제목"
            name="expTitle"
            rules={[
              {
                required: true,
                message: "지출 제목을 입력해주세요!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* 게시글 선택 */}
          <Form.Item
            label="게시글 선택"
            name="sns"
            rules={[
              {
                required: true,
                message: "경비 연결할 sns 게시글을 선택해주세요!",
              },
            ]}
          >
            <Select style={{ width: "350px" }} onChange={handleCardChange}>
              <Option value="null">선택 안함</Option>
              {tripSns.map((sns, index) => {
                return (
                  <Option value={sns.snsNo} key={index}>
                    {sns.snsTitle}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          {/* 영수증 등록 */}
          <div className="receiptOcr" style={{ display: "flex" }}>
            <Form.Item
              label="영수증 등록"
              name="receipt"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              style={{ justifyContent: "center" }}
              onChange={() => setShowBtn(true)}
            >
              <div>
                <Dragger
                  name="file"
                  action="/upload"
                  onChange={handleFileUpload}
                  fileList={[]}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                  </p>
                </Dragger>
              </div>
            </Form.Item>
            {showBtn && (
              <Form.Item style={{ justifyContent: "center" }}>
                <Button onClick={Receipt}>데이터 추출</Button>
              </Form.Item>
            )}
          </div>

          <br />

          {/* 결제 방식 */}
          <Form.Item
            label="결제 방식"
            name="expWay"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Radio.Group onChange={setValue} value={value}>
              <Space direction="horizontal" style={{ margin: 5 }}>
                <Radio value={"현금"} onClick={() => setShow(false)}>
                  현금
                </Radio>
                <Radio value={"카드"} onClick={() => setShow(true)}>
                  카드
                </Radio>
              </Space>

              {show && (
                <div id="divshow" style={{ display: "block", margin: "10px" }}>
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
                    <Select
                      style={{ width: "250px" }}
                      onChange={handleCardChange}
                    >
                      {cards.map((card, index) => {
                        return (
                          <Option value={card.cardNo} key={index}>
                            {card.cardName}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
              )}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="사용처"
            name="expPlace"
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
            name="expAddress"
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
            name="expMoney"
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
            name="expCate"
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
