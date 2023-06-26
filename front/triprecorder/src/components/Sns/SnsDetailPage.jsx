import { RollbackOutlined } from "@ant-design/icons";
import api from "api/axios";
import SnsDetail from "components/Search/SnsDetail";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SnsDetailPage = () => {
  const [snsList, setSnsList] = useState([]);
  let { snsNo } = useParams();

  // 데이터 불러오기
  useEffect(() => {
    api.get("/sns/detail/" + snsNo).then((res) => {
      const data = res.data;
      setSnsList([data]);
      console.log("sns " + snsList);
    });
  }, []);

  // 게시글 컴포넌트가 변경되었을 때 (삭제)
  const updateSnsList = (newList) => {
    setSnsList("delete");
  };

  return (
    <div className="bigDiv" style={{ textAlign: "center" }}>
      <button
        className="btn profile-settings-btn"
        onClick={() => {
          // setImageState([]);
          // setLoading(true);
          // profileService
          //   .getCategoryList(userNum)
          //   .then((res) => {
          //     console.log(res);
          //     // setImages(res);
          //     setImageState(res);
          //     setLoading(false);
          //   });
        }}
      >
        <RollbackOutlined />
      </button>
      {snsList.map((data, i) => {
        return (
          <SnsDetail
            snsData={data}
            snsList={snsList}
            updateSnsList={updateSnsList}
          />
        );
      })}
      {snsList === "delete" ? <h1>삭제된 게시글입니다.</h1> : <></>}
    </div>
  );
};

export default SnsDetailPage;
