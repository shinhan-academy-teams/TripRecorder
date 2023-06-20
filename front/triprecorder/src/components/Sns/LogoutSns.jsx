import axios from "axios";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { allDataAtom } from "recoil/snsAtom";
import "style/sns.scss";

const LogoutSns = () => {
  const [allData, setAllData] = useRecoilState(allDataAtom);
  useEffect(() => {
    axios
      .get("/sns/list")
      .then((res) => {
        const allData = res.data;
        // console.log("모든 데이터 : ", allData);
        setAllData(allData.map((oneData) => oneData));
      })
      .catch((err) => console.log("error", err));
  }, []);

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
              {data.snsPhoto.map((photo, index) => {
                return (
                  <div key={index}>
                    <img className="snsimg" src={photo} alt="아아아ㅏ" />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LogoutSns;
