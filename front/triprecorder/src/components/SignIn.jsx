import React from "react";
import styled from "@emotion/styled";
import { trip1, trip2, tripRecorder } from "../assets";
const SignIn = (props) => {
  const DivInner = styled.div`
    margin-bottom: 0.75rem;
  `;
  const Footer = styled.div`
    text-align: center;
  `;

  const LoginForm = styled.div`
    display: flex;
    background-color: #ffffff;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
    width: 24rem;
    height: 32rem;
  `;

  const Input = styled.input`
    display: block;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.375rem;
    padding-right: 0.375rem;
    color: #6b7280;
    width: 100%;
    border-radius: 0.375rem;
    border-width: 1px;
    border-color: #d1d5db;
    background-color: #d9d9d9;
  `;
  const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 600;
  `;
  const Button = styled.button`
    display: block;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-bottom: 0.375rem;
    background-color: #7fb77e;
    color: #ffffff;
    text-align: center;
    width: 100%;
    border-radius: 0.375rem;

    :hover {
      background-color: #649364;
    }
  `;
  const Link = styled.a`
    color: #7fb77e;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 600;
  `;
  const ImgComponent = styled.img`
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  `;

  return (
    <LoginForm>
      <div style={{ width: "18rem" }}>
        {/* Heading */}
        <h1
          style={{
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
            fontWeight: "600",
          }}
        >
          <Link href="http://localhost:3000/">
            <ImgComponent src={tripRecorder} id="logo" />
          </Link>
        </h1>
        <small style={{ color: "#9CA3AF" }}>
          지갑을 지켜주는 여행용 SNS 플랫폼 TripRecoder
        </small>
        {/* Form */}
        <form style={{ marginTop: "1rem" }}>
          <DivInner>
            <Label>ID</Label>
            <Input type="text" placeholder="너의 ID는"></Input>
          </DivInner>

          <DivInner>
            <Label>PW</Label>
            <Input type="password" placeholder="너의 PW는"></Input>
          </DivInner>

          <DivInner
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "center",
            }}
          >
            <Link href="#">비밀번호 찾기</Link>
          </DivInner>
          <DivInner>
            <Button>Sign in</Button>
          </DivInner>
        </form>
      </div>
      <Footer>
        <span
          style={{
            color: "#9CA3AF",
            fontSize: "0.75rem",
            lineHeight: "1rem",
            fontWeight: "600",
          }}
        >
          계정이 없나요?{" "}
        </span>
        <Link href="#" onClick={props.changeCheck}>
          Sign Up
        </Link>
      </Footer>
    </LoginForm>
  );
};
export default SignIn;
