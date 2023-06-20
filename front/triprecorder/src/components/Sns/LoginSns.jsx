import api from "api/axios";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { allDataAtom } from "recoil/snsAtom";
import "style/sns.scss";
import { Carousel } from "antd";

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const LoginSns = (token) => {
  const [allData, setAllData] = useRecoilState(allDataAtom);

  useEffect(() => {
    if (token) {
      api
        .get("/sns/list")
        .then((res) => {
          const allData = res.data;
          // console.log("모든 데이터 : ", allData);
          setAllData(allData.map((oneData) => oneData));
        })
        .catch((err) => console.log("error", err));
    }
  }, []);

  useEffect(() => {
    console.log("모든 데이터 : ", allData);
  });

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div className="bigDiv">
      {allData.map((data, i) => {
        return (
          <div className="all" key={i}>
            <div className="userInfo">
              <img
                className="profileImg"
                src={data.snsUser.userProfile}
                alt="프로필 이미지"
              />
              <h2>{data.snsUser.userNick}</h2>
            </div>
            <div className="snsInfo">
              {/* <Carousel afterChange={onChange}> */}
              {data.snsPhoto.map((photo, index) => {
                return (
                  <div className="img" key={index}>
                    <img className="snsimg" src={photo} alt="아아아ㅏ" />
                  </div>
                );
              })}
              {/* </Carousel> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LoginSns;
