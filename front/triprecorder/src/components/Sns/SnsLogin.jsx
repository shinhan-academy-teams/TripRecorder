import { UserOutlined } from "@ant-design/icons";
import { Carousel, Input } from "antd";
import api from "api/axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { allDataAtom, photoAtom } from "recoil/snsAtom";
import "style/sns.scss";

const SnsLogin = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const [allData, setAllData] = useRecoilState(allDataAtom);
  const [photoData, setPhotoData] = useRecoilState(photoAtom);

  useEffect(() => {
    api.get("/sns/list").then((res) => {
      const picData = res.data;
      setAllData(picData.map((d) => d));
      setPhotoData(picData.map((data) => data.snsPhoto));
      console.log(picData);
    });
  }, []);

  useEffect(() => {
    console.log("사진 데이터 : ", photoData);
  }, [photoData]);

  useEffect(() => {
    console.log("모든 데이터 : ", allData);
  }, [allData]);

  return (
    <div className="bigDiv">
      {allData.map((d, i) => {
        return (
          <div className="all" key={i}>
            <div className="leftDiv">
              {/* 사진들 */}
              <Carousel afterChange={onChange} style={{ width: "600px" }}>
                {d.snsPhoto.map((a, k) => {
                  return (
                    <div key={k}>
                      <img
                        src={a}
                        style={{ width: "600px", height: "600px" }}
                        alt="게시물"
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>

            <div className="rightDiv">
              {/* 사용자프로필, 닉네임, 게시글메모 */}
              <div className="profile1">
                <img
                  className="profileImg"
                  src={d.snsUser.userProfile}
                  alt="프로필 이미지"
                />
                <div>
                  <h2>{d.snsUser.userNick}</h2>
                  <h3>{d.snsContent}</h3>
                </div>
              </div>

              {/* 댓글 */}
              <div className="comment">
                {d.reply.map((re, key) => {
                  return (
                    <div className="reply" key={key}>
                      <img
                        className="repProfile"
                        src={re.replyUser.userProfile}
                        alt="댓글 프로필"
                      />
                      <h3 className="repName">{re.replyUser.userNick}</h3>
                      <h3>{re.replyContent}</h3>
                    </div>
                  );
                })}
              </div>
              <Input
                className="repleinput"
                size="large"
                placeholder="댓글을 작성하세요"
                prefix={<UserOutlined />}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SnsLogin;
