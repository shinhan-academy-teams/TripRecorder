import React from "react";
import styled from "@emotion/styled";
import User from "components/Search/User";
import { Button, Form, Input, Select } from "antd";
import { useRecoilState } from "recoil";
import { HashtagSnsAtom, NicknameUserAtom } from "recoil/SearchAtom";
import axios from "axios";
// import {userState}
const Search = () => {
  // 게시글 리스트, 사용자 리스트
  const [userList, setuserList] = useRecoilState(NicknameUserAtom);
  const [snsList, setsnsList] = useRecoilState(HashtagSnsAtom);

  // 검색 버튼 눌렀을 때
  const search = (value) => {
    console.log(value);
    const searchType = value.searchType;
    const search = value.searchValue;

    if (searchType === "nickname") {
      axios
        .post("/search/nickname", { search })
        .then((res) => {
          console.log(res);
          setuserList(res.data.map((data) => data));
          setsnsList([]);
        })
        .catch((err) => console.log("error", err));
    }
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
          console.log(user);
          return (
            <User userNick={user.userNick} src={user.userProfile} key={i} />
          );
        })}
      </div>

      {/* 해시태그 검색 */}
      <div></div>
    </div>
  );
};

export default Search;
