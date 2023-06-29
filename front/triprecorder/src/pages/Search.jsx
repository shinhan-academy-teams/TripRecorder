import React, { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import api from "api/axios";
import { useRecoilState } from "recoil";
import { HashtagSnsAtom } from "recoil/SearchAtom";
import UserTripNum from "components/Search/UserTripNum";
import SnsDetail from "components/Search/SnsDetail";

const Search = () => {
  // 게시글 리스트, 사용자 리스트
  const [userList, setuserList] = useState([]);
  const [snsList, setsnsList] = useRecoilState(HashtagSnsAtom);

  // 토큰
  const token = Cookies.get("jwtToken");

  // 로드 시 리셋
  useEffect(() => {
    setsnsList([]);
  }, []);
  // 검색 버튼 눌렀을 때
  const search = (value) => {
    const searchType = value.searchType;
    const search = value.searchValue;
    if (searchType === "nickname") {
      axios
        .post("/search/nickname", { search })
        .then((res) => {
          setuserList(res.data.map((data) => data));
          setsnsList([]);
        })
        .catch((err) => console.log("error", err));
    } else {
      setsnsList([]);
      api
        .post("/search/hashtag", { search })
        .then((res) => {
          setsnsList(res.data.map((data) => data));
          setuserList([]);
        })
        .catch((err) => console.log("error", err));
    }
  };
  // 게시글 컴포넌트가 변경되었을 때 (삭제)
  const updateSnsList = (newList) => {
    setsnsList(newList);
  };

  return (
    <div className="bigDiv" style={{ textAlign: "center" }}>
      {/* 검색창 select + input + button */}
      <div>
        <Form name="searchForm" onFinish={search} autoComplete="off">
          <Form.Item
            style={{ width: "200px", display: "inline-block" }}
            label="검색조건"
            name="searchType"
            initialValue="nickname"
          >
            <Select>
              <Select.Option value="nickname">닉네임</Select.Option>
              <Select.Option value="hashtag">해시태그</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            style={{ width: "40%", display: "inline-block" }}
            name="searchValue"
            rules={[
              {
                required: true,
                message: "검색어를 입력해주세요!",
              },
            ]}
          >
            <Input placeholder="검색어를 입력해주세요" />
          </Form.Item>
          <Button htmlType="submit">검색</Button>
        </Form>
      </div>

      {/* 닉네임 검색 */}
      <div>
        {userList.map((user, i) => {
          return (
            <div>
              <UserTripNum
                userNo={user.userNo}
                key={i}
                userNick={user.userNick}
                userProfile={user.userProfile}
              />
            </div>
          );
        })}
      </div>

      {/* 해시태그 검색 */}
      <div>
        {snsList.map((sns, i) => {
          return (
            <SnsDetail
              token={token ? token : null}
              snsData={sns}
              key={i}
              snsList={snsList}
              updateSnsList={updateSnsList}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
