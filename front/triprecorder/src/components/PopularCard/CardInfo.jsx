import React from "react";
import styled from "styled-components";
const CardBox = styled.div`
  display: inline-block;
  text-align: center;
  margin: 10px;
  width: 30%;
`;
const CardImg = styled.img`
  width: 100%;
  display: block;
`;

const CardInfo = ({ image, name }) => {
  return (
    <CardBox>
      <CardImg src={image} alt={name} />
      <h2>{name}</h2>
    </CardBox>
  );
};

export default CardInfo;
