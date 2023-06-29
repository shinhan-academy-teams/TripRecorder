import { LoginOutlined } from "@ant-design/icons";
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
const LinkTag = styled.a`
  color: black;
  text-decoration: none;
`;

const CardInfo = ({ image, name, link }) => {
  return (
    <CardBox>
      <CardImg src={image} alt={name} />
      <h2>{name}</h2>
      <p>
        <LinkTag href={link} target="_blank">
          <LoginOutlined />
          카드 신청하러 가기
        </LinkTag>
      </p>
    </CardBox>
  );
};

export default CardInfo;
