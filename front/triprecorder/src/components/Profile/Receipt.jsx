import { Button, Modal } from "antd";
import profileService from "api/profile.service";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
// import { userNick } from "../../recoil/UserInfo";
import { useRecoilState } from "recoil";
import { cardState } from "../../recoil/Profile";
import { useNavigate } from "react-router-dom";
import { RollbackOutlined } from "@ant-design/icons";
import api from "api/axios";
const Receipt = ({
  expWay,
  expAddress,
  expTime,
  expPlace,
  cardNo,
  expMoney,
  expCate,
}) => {
  let { expNo } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useRecoilState(cardState);
  // const [userNickName, setUserNickName] = useRecoilState(userNick);
  let [exp, setExp] = useState();
  let [cd, setCd] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 경비 주인이면 삭제 버튼 보이게 하기 위한 로그인 정보들
  let { userNick } = useParams();
  const [userNo, setUserNo] = useState();
  const loginUserNo = localStorage.getItem("userNo");
  useEffect(() => {
    const nickname = userNick;
    api
      .post("/auth/findByNick", { nickname })
      .then((res) => {
        setUserNo(res.data);
      })
      .catch((err) => console.log("error", err));
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    profileService.delExp(expNo).then((res) => console.log(res));
    navigate(-1);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    console.log(card);
    profileService.getExpDetail(expNo).then((res) => {
      setExp(res);
    });
    // let getAllcar = async () => {
    // profileService.getAllCard().then((res) => {
    //   console.log(res.find(({ cardNo }) => cardNo === exp?.["cardNo"]));
    //   setCard(res);
    // });
    // };
    // getAllcar();

    // setCd(card?.find(({ cardNo }) => cardNo === exp?.["cardNo"]));
    // console.log(cd?.["cardNo"]);
  }, []);

  const BoxContainer = styled.div`
    display: flex;
    justify-content: center;

    /* align-items: center;
flex-direction: column; */
    font-size: 14px;
    font-family: "courier";
    /* background: #e6e6e6; */
    width: 100%;
    min-height: 50vh;

    padding: 50px 0;
    box-sizing: border-box;
  `;

  const BoxTicket = styled.div`
    background-color: white;
    width: 500px;
    padding: 10px 20px;
    cursor: default;
    position: relative;
    box-shadow: 0px 5px 10px rgb(0 0 0 / 10%);
  `;
  const BoxHeader = styled.div`
    font-size: 14px;
    text-align: center;
    padding: 0px 17px;
    line-height: 0.3rem;
    text-shadow: 0px 0px 1px #000;
    p:nth-child(1) {
      font-size: 17px;
      font-weight: 900;
    }
    > h3 {
      padding: 12px;
      border-top: dashed #333333;
      border-bottom: dashed #333333;
    }
  `;

  const BoxContent = styled.div`
    padding: 0px 17px;
    margin: 20px 0;
  `;
  const BoxCol = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    line-height: 0.1em;
  `;

  const SubTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    border-bottom: solid #333333;
    tr {
      display: flex;
      justify-content: space-between;
      td {
      }
    }
  `;

  const LegalCopy = styled.div`
    margin: 15px 0;
  `;
  return (
    <div className="bigDiv" style={{ textAlign: "center" }}>
      <button
        className="btn profile-settings-btn"
        style={{ textAlign: "right", paddingRight: "25%" }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <RollbackOutlined />
      </button>
      <BoxContainer>
        <BoxTicket>
          <BoxHeader>
            {/* <Button
            onClick={() => {
              console.log(
                exp
                // card?.find(({ cardNo }) => cardNo === exp?.["cardNo"])?.[
                //   "cardName"
                // ]
              );
            }}
          >
            test
          </Button> */}
            <p>영수증</p>
            <h3>Invoice</h3>
          </BoxHeader>
          <BoxContent>
            <BoxCol>
              <p>결제방식</p>
              <p>{exp?.["expWay"]}</p>
            </BoxCol>
            <BoxCol>
              <p>사용처</p>
              <p>{exp?.["expAddress"]}</p>
            </BoxCol>
            <BoxCol>
              <p>거래일시</p>
              <p>
                {exp?.["expTime"]
                  ? new Date(exp?.["expTime"]).toISOString().split("T")[0] +
                    " " +
                    new Date(exp?.["expTime"])
                      .toISOString()
                      .split("T")[1]
                      .split(".")[0]
                  : ""}
              </p>
            </BoxCol>
            <BoxCol>
              <p>장소</p>
              <p>{exp?.["expPlace"]}</p>
            </BoxCol>
            <SubTable>
              <tbody>
                <tr>
                  <th>지출</th>
                  <td>
                    {exp?.["expMoney"]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    KRW
                  </td>
                </tr>
              </tbody>
            </SubTable>
            <LegalCopy>
              <p>
                <strong>결제 카드</strong>{" "}
                {
                  // cd?.["cardName"]
                  exp?.["cardNo"] !== null
                    ? card?.find(({ cardNo }) => cardNo === exp?.["cardNo"])?.[
                        "cardName"
                      ]
                    : "현금"
                }
              </p>
              <p>
                <strong>결제 카테고리</strong> {exp?.["expCate"]}
              </p>
            </LegalCopy>
          </BoxContent>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            {loginUserNo == userNo ? (
              <Button
                style={{ backgroundColor: "#7fb77e", color: "#ffffff" }}
                onClick={showModal}
                // onClick={() => {

                //   profileService.delExp(expNo).then((res) => console.log(res));
                // }}
              >
                삭제
              </Button>
            ) : (
              <></>
            )}
            <Modal
              okButtonProps={{
                style: { backgroundColor: "#7fb77e", color: "#ffffff" },
              }}
              cancelButtonProps={{
                style: { backgroundColor: "#7fb77e", color: "#ffffff" },
              }}
              title="해당 게시글을 경비를하시겠습니까?🤔"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>삭제를 원하시면 OK를 눌러주세요 !</p>
            </Modal>
          </div>
        </BoxTicket>
      </BoxContainer>
    </div>
  );
};

export default Receipt;
