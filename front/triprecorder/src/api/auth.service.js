import api from "./axios";

const checkDuplicateId = (userId) => {
  return api
    .post("/auth/signup/useridCheck", { userId })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};



const authService = {
  checkDuplicateId,
};

export default authService;
