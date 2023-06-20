import { Button, Divider, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
const Expense = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch("http://192.168.0.90:9999/exp/4/list")
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        // width: "2.5rem",
      }}
    >
      {/* <Button>ds</Button>
      <Button>ds</Button>
      <Button>ds</Button> */}
      {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
      <div
        id="scrollableDiv"
        style={{
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
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.expTime}>
                <List.Item.Meta
                  // avatar={<Avatar src={item.picture.large} />}
                  title={
                    <a href="#">
                      {item.exp.expTitle} {item.exp.expPlace}
                    </a>
                  }
                  description={item.expTime}
                />
                <div>Content</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
        {/* </div> */}
      </div>
    </div>
  );
};
export default Expense;
