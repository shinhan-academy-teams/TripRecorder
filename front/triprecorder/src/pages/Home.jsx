import api from "api/axios";
import SnsDetail from "components/Search/SnsDetail";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { LocalUserNickAtom } from "recoil/LocalStorageAtom";
import { allDataAtom } from "recoil/snsAtom";

const Home = () => {
  const token = Cookies.get("jwtToken");
  const [allData, setAllData] = useRecoilState(allDataAtom);
  const [userNick] = useRecoilState(LocalUserNickAtom);

  useEffect(() => {
    console.log(userNick);
    api.get("/sns/list").then((res) => {
      const picData = res.data;
      setAllData(picData.map((d) => d));
    });
  }, [userNick]);
  // 게시글 컴포넌트가 변경되었을 때 (삭제)
  const updateSnsList = (newList) => {
    setAllData(newList);
  };

  return (
    <div className="snsbox">
      <div className="bigDiv">
        {allData.length > 0 ? (
          allData.map((sns, i) => {
            return (
              <SnsDetail
                snsData={sns}
                token={token ? token : null}
                key={i}
                snsList={allData}
                updateSnsList={updateSnsList}
              />
            );
          })
        ) : (
          <div style={{ textAlign: "center" }}>
            <h1>아직 게시글이 없습니다.</h1>
            <p>좌측 탭의 여행 등록을 통해 인상 깊었던 여행을 기록해 보세요✏️</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
