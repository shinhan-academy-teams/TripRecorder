import api from "./axios";

import Cookies from "js-cookie";

const getSnsPostList = (tripNum) => {
  return api
    .get(`/sns/${tripNum}/list`)
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));
};

const getCategoryList = (userNo) => {
  return api
    .get(`/trip/list/${userNo}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

const getFollowerList = (userNo) => {
  return api
    .get(`/follow/${userNo}/follower/list`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
const getFollowingList = (userNo) => {
  return api
    .get(`/follow/${userNo}/following/list`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

const getExpList = (userNo) => {
  return api
    .get(`/exp/${userNo}/list`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

const getProfileInfo = (userNo) => {
  return api
    .get(`profile/${userNo}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

const profileService = {
  getSnsPostList,
  getCategoryList,
  getFollowerList,
  getFollowingList,
  getExpList,
  getProfileInfo,
};

export default profileService;
