import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  benefitListAtom,
  cardListAtom,
  categoryAtom,
} from "recoil/PopularCard";
import { Button, Form, Input, Layout, Menu } from "antd";
import axios from "axios";
import CardInfo from "components/PopularCard/CardInfo";
import Benefit from "components/PopularCard/Benefit";

const PopularCard = () => {
  // 카테고리, 카테고리에 따른 카드 리스트
  const [cardList, setCardList] = useRecoilState(cardListAtom);
  const [category, setCategory] = useRecoilState(categoryAtom);
  // 혜택 리스트
  const [benefitList, setBenefitList] = useRecoilState(benefitListAtom);

  const categoryList = ["쇼핑", "외식", "교통", "관광", "숙박", "항공"];

  // 인기 카드 3개 가져오기: category가 변경될 때마다 실행
  useEffect(() => {
    axios
      .post("/card/topcard", { category })
      .then((res) => {
        const allData = res.data;
        setCardList(allData.map((oneData) => oneData));
      })
      .catch((err) => console.log("error", err));
  }, [category]);

  // 카테고리 선택하면 setCategory, 혜택 초기화
  const selectCategory = (item) => {
    setCategory(item.key);
    setBenefitList([]);
  };

  // 혜택 조회 버튼 눌렀을 때
  const benefits = (value) => {
    const price = value.cost;
    const cardNo = cardList.map((card) => card.cardNo);

    axios
      .post("/card/carddiscount", { price, cardNo, category })
      .then((res) => {
        setBenefitList(res.data.map((data) => data));
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <div className="bigDiv">
      {/* 금액 입력 form + button */}
      <div>
        <Form name="benefitForm" onFinish={benefits} autoComplete="off">
          <Form.Item
            style={{ width: "350px", display: "inline-block" }}
            label="소비 금액"
            name="cost"
            rules={[
              {
                required: true,
                message: "금액을 입력해주세요!",
              },
            ]}
          >
            <Input type="number" placeholder="금액을 입력해주세요" />
          </Form.Item>

          <Button htmlType="submit">혜택조회</Button>
        </Form>
      </div>

      {/* 카테고리 nav */}
      <div>
        {/* https://github.com/ant-design/ant-design/blob/master/components/layout/demo/top.tsx */}
        <Layout className="layout">
          <Menu
            style={{ backgroundColor: "#B1D7B4" }}
            mode="horizontal"
            defaultSelectedKeys={[category]}
            onClick={selectCategory}
            items={categoryList.map((cate) => {
              const key = cate;
              return {
                key,
                label: cate,
              };
            })}
          />
        </Layout>
      </div>

      {/* 카드 리스트 */}
      <div>
        {cardList.map((data, i) => {
          return (
            <CardInfo image={data.cardPhoto} name={data.cardName} key={i} />
          );
        })}
      </div>

      <div>
        {benefitList.map((data, i) => {
          return (
            <Benefit
              discount={data.discountAmount}
              payback={data.payback}
              point={data.point}
              annual={data.annual}
              total={data.totalDiscountAmount}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PopularCard;
