import { Card } from "antd";
import React from "react";
import styled from "styled-components";

const BenefitBox = styled.div`
  display: inline-block;
  text-align: center;
  margin: 10px;
  width: 30%;
  span {
    display: inline-block;
  }
  .type {
    width: 50%;
    text-align: left;
  }
  .amount {
    width: 50%;
    text-align: right;
  }
`;

const Benefit = ({ discount, payback, point, annual, total }) => {
  return (
    <BenefitBox>
      <Card title="RECEIPT">
        <p>
          <span className="type">할인</span>
          <span className="amount">{discount === null ? 0 : discount}</span>
        </p>
        <p>
          <span className="type">캐시백</span>
          <span className="amount">{payback === null ? 0 : payback}</span>
        </p>
        <p>
          <span className="type">포인트</span>
          <span className="amount">{point === null ? 0 : point}</span>
        </p>
        <p>
          <span className="type">연회비</span>
          <span className="amount">{annual}</span>
        </p>
        <hr />
        <p style={{ color: "red" }}>
          <span className="type">최종혜택</span>
          <span className="amount">
            {total >= 0 ? "+" : "-"}
            {total}
          </span>
        </p>
      </Card>
    </BenefitBox>
  );
};

export default Benefit;
