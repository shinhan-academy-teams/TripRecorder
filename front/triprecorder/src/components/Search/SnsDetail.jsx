import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Carousel, Modal, Space, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import api from "api/axios";
import profileService from "api/profile.service";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { profileUserNo } from "recoil/Profile";
import "style/sns.scss";
const { confirm } = Modal;

const SnsDetail = ({ snsData, snsList, updateSnsList }) => {
  const [prfUserNo, setPrfUserNo] = useRecoilState(profileUserNo);
  // 링크 이동
  const navigate = useNavigate();
  // 게시글 사진, 댓글, 해시태그 정보 (리스트로 들어오는 정보)
  const [photoData, setPhotoData] = useState([]);
  const [replyData, setReplyData] = useState([]);
  const [hashtagData, setHashtagData] = useState([]);
  // 좋아요 관련 정보
  const [heart, setHeart] = useState();
  const [heartCnt, setHeartCnt] = useState();
  // 댓글 작성 내용
  const [replyContent, setReplyContent] = useState("");
  // 경비, 경비 모달
  const [exp, setExp] = useState({ expTitle: "", expPlace: "", expMoney: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 현재 로그인중인 사용자 번호
  const userNo = localStorage.getItem("userNo");

  // 컴포넌트 로드 시 데이터 설정
  useEffect(() => {
    setPhotoData(snsData?.snsPhoto?.map((data) => data));
    setReplyData(snsData?.reply?.map((data) => data));
    setHashtagData(snsData?.hashtag?.map((data) => data));
    setHeart(snsData?.heart);
    setHeartCnt(snsData?.heartCnt);
  }, [snsData]);

  // 좋아요 등록 및 취수
  const heartClick = () => {
    userNo
      ? api
          .post("/heart/register/" + snsData.snsNo)
          .then((res) => {
            const result = res.data;
            setHeart(result);

            result
              ? message.success("게시글을 좋아합니다.")
              : message.success("좋아요를 취소합니다.");
            result ? setHeartCnt(heartCnt + 1) : setHeartCnt(heartCnt - 1);
          })
          .catch((err) => console.log("error", err))
      : message.error("로그인 후 이용 가능합니다!");
  };

  // 댓글 작성
  const replyRegisterChange = (event) => {
    setReplyContent(event.target.value);
  };
  const replyRegisterClick = () => {
    userNo
      ? api
          .post("/reply/register/" + snsData?.snsNo, { replyContent })
          .then((res) => {
            message.success("댓글을 등록했습니다. 😊");

            console.log(res.data);
            setReplyData([...replyData, res.data]);
            setReplyContent("");
          })
          .catch((err) => {
            message.error("댓글 작성에 실패했습니다. 😥");
            console.log(err);
          })
      : message.error("로그인 후 이용 가능합니다!");
  };
  // 댓글 삭제
  const replyDeleteClick = (event) => {
    const replyNo = event.currentTarget.getAttribute("value");
    confirm({
      title: "댓글 삭제",
      icon: <ExclamationCircleFilled />,
      content: "정말 댓글을 삭제하시겠습니까?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        api
          .delete("/reply/delete/" + replyNo)
          .then(() => {
            message.success("댓글 삭제에 성공했습니다.");
            setReplyData(replyData.filter((reply) => reply.replyNo != replyNo));
          })
          .catch(() => message.error("댓글 삭제에 실패했습니다."));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  // 사용자 프로필로 이동
  const moveToProfile = (event) => {
    const userNick = event.currentTarget.getAttribute("value");
    console.log(userNo, "####");
    navigate(`${userNick}`);
    profileService.getUserNo(userNick).then((res) => {
      console.log(res, "@@@@@@@2");
      setPrfUserNo(res);
    });
  };
  // 경비 모달
  const showExpInfo = (event) => {
    const expNo = event.currentTarget.getAttribute("value");
    api
      .post("exp/sns/" + expNo)
      .then((res) => {
        console.log(res);
        setExp(res.data);
        setIsModalOpen(true);
      })
      .catch((err) => console.log("error", err));
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 게시글 삭제
  const snsDeleteClick = (event) => {
    const snsNo = event.currentTarget.getAttribute("value");
    confirm({
      title: "게시글 삭제",
      icon: <ExclamationCircleFilled />,
      content: "정말 게시글을 삭제하시겠습니까?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log(snsNo);
        api
          .delete("/sns/delete/" + snsNo)
          .then(() => {
            message.success("게시글 삭제에 성공했습니다.");
            const newList = snsList.filter((sns) => sns?.snsNo != snsNo);
            console.log(newList);
            updateSnsList(newList);
          })
          .catch(() => message.error("게시글 삭제에 실패했습니다."));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="all">
      {/* 게시글 사진 */}
      <div className="leftDiv">
        <Carousel style={{ width: "600px" }}>
          {photoData?.map((src, i) => {
            return (
              <div key={i}>
                <img
                  src={src}
                  style={{ width: "600px", height: "600px" }}
                  alt="게시물"
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className="rightDiv" style={{ textAlign: "left" }}>
        {/* 게시글 작성자 및 내용, 해시태그 */}
        <div style={{ height: "250px" }}>
          <div className="profile1">
            <img
              onClick={moveToProfile}
              value={snsData?.snsUser.userNick}
              className="profileImg"
              src={snsData?.snsUser.userProfile}
              alt="프로필 이미지"
            />
            <div>
              <h2 value={snsData?.snsUser.userNick} onClick={moveToProfile}>
                {snsData?.snsUser.userNick}
              </h2>
              <h3>{snsData?.snsContent}</h3>
              {hashtagData?.map((hashtag, i) => {
                return <span key={i}>{hashtag} </span>;
              })}
              <p>
                {snsData
                  ? new Date(snsData?.snsRegdate).toISOString().split("T")[0] +
                    " " +
                    new Date(snsData?.snsRegdate)
                      .toISOString()
                      .split("T")[1]
                      .split(".")[0]
                  : ""}
              </p>
            </div>
          </div>
          {/* 좋아요, 경비 보기, 게시글 삭제*/}
          <div style={{ marginLeft: "50px" }}>
            <Button onClick={heartClick}>
              {heart ? "♥️" : "♡"} {heartCnt}
            </Button>
            {snsData?.expNo ? (
              <>
                <Button value={snsData.expNo} onClick={showExpInfo}>
                  경비 정보
                </Button>
              </>
            ) : (
              <></>
            )}
            {snsData?.snsUser?.userNo == userNo ? (
              <Button value={snsData?.snsNo} onClick={snsDeleteClick} danger>
                게시글 삭제
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* 댓글 */}
        <div
          className="comment"
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            height: "250px",
          }}
        >
          {replyData?.map((reply, i) => {
            return (
              <div
                className="reply"
                key={i}
                style={{
                  justifyContent: "flex-start",
                }}
              >
                <img
                  onClick={moveToProfile}
                  value={reply?.replyUser.userNick}
                  className="repProfile"
                  src={reply?.replyUser.userProfile}
                  alt="댓글 프로필"
                />
                <h3
                  onClick={moveToProfile}
                  value={reply?.replyUser.userNick}
                  className="repName"
                >
                  {reply?.replyUser.userNick}
                </h3>
                <div style={{ width: "40%" }}>
                  <h3>{reply?.replyContent}</h3>
                  <p>
                    {reply
                      ? new Date(reply?.replyRegdate)
                          .toISOString()
                          .split("T")[0] +
                        " " +
                        new Date(reply?.replyRegdate)
                          .toISOString()
                          .split("T")[1]
                          .split(".")[0]
                      : ""}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  {userNo == reply?.replyUser.userNo ? (
                    <Button
                      danger
                      value={reply?.replyNo}
                      onClick={replyDeleteClick}
                    >
                      X
                    </Button>
                  ) : (
                    <Button style={{ visibility: "hidden" }}>X</Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* 댓글 작성 */}
        <div style={{ height: "20%" }}>
          <Space direction="vertical" size="middle">
            <Space.Compact
              className="repInput"
              style={{
                width: "100%",
              }}
            >
              <TextArea
                className="replyArea"
                placeholder="댓글 작성..."
                rows={4}
                name="rep"
                onChange={replyRegisterChange}
                value={replyContent}
              />
              <Button
                type="primary"
                onClick={replyRegisterClick}
                style={{ height: "99px" }}
              >
                게시
              </Button>
            </Space.Compact>
          </Space>
        </div>
      </div>
      {/* 경비 모달 */}
      <Modal
        data={exp}
        title="경비 정보"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>제목: {exp.expTitle}</p>
        <p>사용처: {exp.expPlace}</p>
        <p>결제 금액: {exp.expMoney}원</p>
      </Modal>
    </div>
  );
};

export default SnsDetail;
