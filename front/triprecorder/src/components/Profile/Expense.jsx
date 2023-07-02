import { Button, Divider, List, Skeleton } from "antd";
import profileService from "api/profile.service";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { tripNoState } from "../../recoil/Profile";
import { userNick } from "../../recoil/UserInfo";
import { cardState } from "../../recoil/Profile";
import { useNavigate } from "react-router-dom";
import s from "react-aws-s3";
const Expense = () => {
  const [loading, setLoading] = useState(false);
  const [userNickName, setUserNickName] = useRecoilState(userNick);
  const [card, setCard] = useRecoilState(cardState);
  const [data, setData] = useState([]);
  const [tno, setTno] = useRecoilState(tripNoState);
  const navigate = useNavigate();
  const InfoDiv = styled.div`
    width: 100px;
    height: 50px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    background-color: #ffc090;
    border-radius: 10px 10px 10px 10px;
  `;
  const TopDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #e5e5e5;
  `;
  const MainDiv = styled.div`
    padding: 2.5rem;
    border-radius: 0.75rem;
    background: #f4f5fa;
  `;
  const SubscriptionDiv = styled.div`
    display: flex;
    margin-top: 2.5rem;
    margin-left: 0;
    margin-top: 3rem;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    @media (min-width: 768px) {
      margin-left: 2rem;
      margin-top: 0;
      flex-direction: row;
    }
  `;
  const CardDiv = styled.div`
    border-radius: 0.75rem;
    background: #7fb77e;
  `;
  const CardInner = styled.div`
    display: flex;
    padding: 2rem;
    color: "#ffffff"
    background-color: #7fb77e;
    --transform-translate-x: 1rem;
    --transform-translate-y: 1rem;
    flex-direction: column;
    width: 24rem;
    border-radius: 0.75rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);

    @media (min-width: 768px) {
      width: auto;
    }
  `;

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    console.log("h2");
    profileService.getExpList(tno).then((res) => {
      setData([res]);
      console.log(data);
    });
  };
  useEffect(() => {
    loadMoreData();

    profileService.getAllCard().then((res) => {
      setCard(res);
    });
  }, []);
  return (
    <>
      {/* <TopDiv> */}
      {/* <MainDiv>
        <SubscriptionDiv>
          <CardDiv>
            <CardInner>
              <img src="../../assets/짱구.jpg" style={{ width: "2rem" }} />
            </CardInner>
          </CardDiv>
        </SubscriptionDiv>
      </MainDiv> */}
      {/* </TopDiv> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <SubscriptionDiv>
          {/* <div style={{ display: "flex", justifyContent: "space-evenly" }}> */}
          <CardDiv>
            <CardInner>
              <span style={{ color: "white" }}>
                총 예산:{" "}
                {data[0]?.tripExp
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </CardInner>
          </CardDiv>{" "}
          <CardDiv>
            <CardInner>
              <span style={{ color: "white" }}>
                사용 금액:{" "}
                {data[0]?.useExp
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </CardInner>
          </CardDiv>{" "}
          <CardDiv>
            <CardInner>
              <span style={{ color: "white" }}>
                남은 금액:{" "}
                {data[0]?.remainExp
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </CardInner>
          </CardDiv>
          {/* </div> */}
        </SubscriptionDiv>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
            padding: "20px",
            // width: "2.5rem",
          }}
        >
          {/* <MainDiv> */}

          {/* </MainDiv> */}
          {/* <InfoDiv>총 예산: {data[0]?.tripExp}</InfoDiv>
          <InfoDiv>쓴 돈: {data[0]?.useExp}</InfoDiv>
          <InfoDiv>남은 돈: {data[0]?.remainExp}</InfoDiv> */}
        </div>
        {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
        <div
          id="scrollableDiv"
          style={{
            width: 800,
            height: 400,
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 50}
            // loader={
            //   <Skeleton
            //     avatar
            //     paragraph={{
            //       rows: 1,
            //     }}
            //     active
            //   />
            // }
            endMessage={<Divider plain>더 이상 없어요 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data[0]?.exp}
              renderItem={(item, idx) => (
                <List.Item key={idx}>
                  <List.Item.Meta
                    style={{ textAlign: "left" }}
                    // avatar={<Avatar src={item.picture.large} />}
                    title={
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/${userNickName}/${item.expNo}`);
                        }}
                      >
                        {item?.expTitle}
                      </div>
                    }
                    description={
                      new Date(item.expTime).toISOString().split("T")[0] +
                      " " +
                      new Date(item.expTime)
                        .toISOString()
                        .split("T")[1]
                        .split(".")[0]
                    }
                  />
                  <div>
                    {item?.expPlace}에서{" "}
                    {item?.expMoney
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    KRW 소비
                  </div>
                  {/* <div>전체: {data[0]?.tripExp}</div>
                <div>사용: {data[0]?.useExp}</div>
                <div>남음: {data[0]?.remainExp}</div> */}
                </List.Item>
              )}
            />
          </InfiniteScroll>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
export default Expense;
