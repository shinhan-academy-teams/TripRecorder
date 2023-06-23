import { Button, Carousel, Input, Space, message } from "antd";
import authService from "api/auth.service";
import api from "api/axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { allDataAtom, photoAtom, repDataAtom } from "recoil/snsAtom";
import "style/sns.scss";

const { TextArea } = Input;
// const { Search } = Input;

const SnsLogin = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const [allData, setAllData] = useRecoilState(allDataAtom);
  const [photoData, setPhotoData] = useRecoilState(photoAtom);
  const [repData, setRepData] = useRecoilState(repDataAtom);

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

  const handleRep = (e) => {
    setRepData(e.target.value);
  };

  const onRep = (snsNo) => {
    authService
      .RegisterRep(repData, snsNo)
      .then((res) => {
        message.success("댓글을 등록했습니다. 😊");
        
      })
      .catch((err) => message.error("댓글 작성에 실패했습니다. 😥"));
  };

  const onHeart = () =>{
    
  };

  return (
    <div className="bigDiv">
      {allData.map((d, i) => {
        return (
          <div className="all" key={i}>
            <div className="leftDiv">
              {/* 사진들 */}
              <Carousel afterChange={onChange} style={{ width: "800px" }}>
                {d.snsPhoto.map((a, k) => {
                  return (
                    <div key={k}>
                      <img
                        src={a}
                        style={{ width: "800px", height: "800px" }}
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

              <div>
                <Button onClick={onHeart}>👍 {d.heartCnt}</Button>
              </div>

              <Space direction="vertical" size="middle">
                <Space.Compact
                  className="repInput"
                  style={{
                    width: "100%",
                  }}
                >
                  <TextArea
                    placeholder="댓글 작성..."
                    rows={4}
                    name="rep"
                    onChange={handleRep}
                  />
                  <Button
                    type="primary"
                    onClick={() => onRep(d.snsNo)}
                    style={{ height: "99px" }}
                  >
                    게시
                  </Button>
                </Space.Compact>
              </Space>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SnsLogin;
