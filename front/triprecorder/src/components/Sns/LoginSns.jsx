import api from "api/axios";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { allDataAtom } from "recoil/snsAtom";
import "style/sns.scss";
// import { Carousel } from "antd";

// const contentStyle = {
//   margin: 0,
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };
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

  // const onChange = (currentSlide) => {
  //   console.log(currentSlide);
  // };

  return (
    <div className="bigDiv">
      {allData.map((data, i) => {
        return (
          <div className="all" key={i}>
            {/* 프로필 */}
            <div className="userInfo">
              <img
                className="profileImg"
                src={data.snsUser.userProfile}
                alt="프로필 이미지"
              />
              <h2>{data.snsUser.userNick}</h2>
            </div>
            {/* 게시물 */}
            <div className="snsInfo">
              <div className="imglist">
                {/* <Carousel afterChange={onChange}> */}
                {data.snsPhoto.map((photo, index) => {
                  return (
                    <div className="img" key={index}>
                      <img className="snsimg" src={photo} alt="게시물이미지" />
                    </div>
                  );
                })}
                {/* </Carousel> */}
              </div>
              {/* 댓글 */}
              <div className="comment">
                {data.reply.map((rep, index) => {
                  return (
                    <div className="reply" key={index}>
                      <img
                        className="repProfile"
                        src={rep.replyUser.userProfile}
                        alt="댓글쓴이 프로필"
                      />
                      <h3>{rep.replyUser.userNick}</h3>
                      <p>{rep.replyContent}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LoginSns;
