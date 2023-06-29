import { RollbackOutlined } from "@ant-design/icons";
import { message } from "antd";
import api from "api/axios";
import SnsDetail from "components/Search/SnsDetail";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SnsDetailPage = () => {
  const [snsList, setSnsList] = useState([]);
  const navigate = useNavigate();
  let { snsNo } = useParams();

  // 데이터 불러오기
  useEffect(() => {
    api.get("/sns/detail/" + snsNo).then((res) => {
      const data = res.data;
      setSnsList([data]);
    });
  }, []);

  // 게시글 컴포넌트가 변경되었을 때 (삭제)
  const updateSnsList = (newList) => {
    navigate(-1);
  };

  return (
    <div className="bigDiv" style={{ textAlign: "center" }}>
      <button
        className="btn profile-settings-btn"
        style={{ textAlign: "right" }}
        onClick={() => {
          navigate(-1);
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
            key={i}
          />
        );
      })}
    </div>
  );
};

export default SnsDetailPage;
