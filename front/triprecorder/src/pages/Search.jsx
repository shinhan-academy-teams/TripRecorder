import React from "react";
import styled from "@emotion/styled";

const Search = () => {
  const DivBox = styled.div`
    position: absolute;
    width: 40%;
    border: 3px solid #7fb77e;
    border-radius: 30px;
    top: 50%;
    left: 50%;
    display: grid;
    align-items: center;
    transform: translate(-20%, -50%);
    text-align: center;
  `;
  return (
    <DivBox>
      <p>Search</p>
      <p>검색입니당</p>
      <p>검색입니당</p>
      <p>검색입니당</p>
      <p>검색입니당</p>
    </DivBox>
  );
};

export default Search;
