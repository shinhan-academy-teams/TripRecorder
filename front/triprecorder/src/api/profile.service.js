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
    .get(`/profile/${userNo}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

const getExpDetail = (expNo) => {
  return api
    .get(`/exp/detail/${expNo}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
const delExp = (expNo) => {
  return api
    .delete(`/exp/delete/${expNo}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

const getConnected = (tripNum) => {
  return api
    .post(`/exp/list/${tripNum}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

const getAllCard = () => {
  return api
    .post("/card/list")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

const getUserNo = (nickname) => {
  return api
    .post("/auth/findByNick", { nickname })
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
  getExpDetail,
  delExp,
  getConnected,
  getAllCard,
  getUserNo,
};

export default profileService;
