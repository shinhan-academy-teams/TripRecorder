import { Button, Divider, List, Skeleton } from "antd";
import profileService from "api/profile.service";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { tripNoState } from "../../recoil/Profile";
const Expense = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [tno, setTno] = useRecoilState(tripNoState);
  const InfoDiv = styled.div`
    width: 100px;
    height: 50px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    background-color: #ffc090;
    border-radius: 10px 10px 10px 10px;
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
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
            padding: "20px",
            // width: "2.5rem",
          }}
        >
          <InfoDiv>총 예산: {data[0]?.tripExp}</InfoDiv>
          <InfoDiv>쓴 돈: {data[0]?.useExp}</InfoDiv>
          <InfoDiv>남은 돈: {data[0]?.remainExp}</InfoDiv>
          <Button> Test</Button>
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
                    // avatar={<Avatar src={item.picture.large} />}
                    title={<a href="#">{item?.expTitle}</a>}
                    description={item.expTime}
                  />
                  <div>
                    {item?.expPlace}에서 {item?.expMoney} KRW 소비
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
