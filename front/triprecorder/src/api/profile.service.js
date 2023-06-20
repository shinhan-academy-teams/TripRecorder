import api from "./axios";
import Cookies from "js-cookie";

const getProfileInfo = (userId) => {
  return api
    .get(`/sns/${userId}/list`)
    .then((res) => {
      // console.log(res);
      return res.data;
    })
    .catch((err) => console.log(err));
};

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

const profileService = {
  getSnsPostList,
  getCategoryList,
};

export default profileService;
