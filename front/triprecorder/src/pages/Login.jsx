import React, { useState } from "react";
import styled from "@emotion/styled";
import SignUp from "components/SignUp";
import trip2 from "assets/trip2.jpg";
import SignIn from "components/SignIn";

const Login = ({ setIsShow }) => {
  setIsShow(false);
  const DivContainer = styled.div`
    display: flex;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    background-color: white;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    width: 100%;
    min-height: 100vh;
  `;
  const LoginContainer = styled.div`
    display: flex;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  `;
  const LoginBanner = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    width: 34rem;
    height: 42rem;
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
  const Credit = styled.div`
    margin-top: 0.75rem;
    width: 100%;
  `;
  const Link = styled.a`
    color: #7fb77e;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 600;
  `;
  const [loginstate, setLoginState] = useState(false);

  const handleLoginState = () => {
    setLoginState(!loginstate);
  };

  return (
    <DivContainer>
      <LoginContainer>
        {loginstate === false ? (
          <SignIn handleLoginState={handleLoginState} />
        ) : (
          <SignUp handleLoginState={handleLoginState} />
        )}

        <LoginBanner>
          <ImgComponent src={trip2} />
        </LoginBanner>
      </LoginContainer>
      <Credit>
        <p style={{ textAlign: "center" }}>
          문의 내용{" "}
          <Link target="_blank" href="www.naver.com">
            dltlaos14@naver.com
          </Link>
          &nbsp;&nbsp;Made by{" "}
          <Link
            target="_blank"
            href="https://github.com/shinhan-academy-teams/TripRecorder"
          >
            github
          </Link>
        </p>
      </Credit>
    </DivContainer>
  );
};
export default Login;
