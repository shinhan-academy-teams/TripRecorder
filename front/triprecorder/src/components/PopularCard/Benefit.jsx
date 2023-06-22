import React from "react";
import styled from "styled-components";

const BenefitBox = styled.div`
  display: inline-block;
  text-align: center;
  margin: 10px;
  width: 30%;
`;
const Benefit = ({ discount, payback, point, annual, total }) => {
  return (
    <BenefitBox>
      <h1>RECEIPT</h1>
      <h1>{discount === null ? 0 : discount}</h1>
      <h1>{payback === null ? 0 : payback}</h1>
      <h1>{point === null ? 0 : point}</h1>
      <h1>{annual}</h1>
      <h1>{total}</h1>
    </BenefitBox>
  );
};

export default Benefit;
