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



  const profileService = {
    getProfileInfo,

  };
  
  export default profileService;
  