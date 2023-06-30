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
        {allData.map((sns, i) => {
          return (
            <SnsDetail
              snsData={sns}
              token={token ? token : null}
              key={i}
              snsList={allData}
              updateSnsList={updateSnsList}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
