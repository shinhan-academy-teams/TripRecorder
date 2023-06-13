import api from "./axios";

const checkDuplicateId = (userId) => {
  return api
    .post("/auth/signup/useridCheck", { userId })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const checkDuplicateNick = (userNick) => {
  return api
    .post("/auth/signup/usernickCheck", { userNick })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const checkDuplicateEmail = (userEmail) => {
  return api
    .post("/auth/signup/useremailCheck", { userEmail })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const signup = (userId, userPw, userName, userNick, userEmail, userGender) => {
  return api
    .post("/auth/signup", {
      userId,
      userPw,
      userName,
      userNick,
      userEmail,
      userGender,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const login = (userId, userPw) => {
  return api
    .post("/login", {
      userId,
      userPw,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const authService = {
  checkDuplicateId,
  checkDuplicateNick,
  checkDuplicateEmail,
  login,
  signup,
};

export default authService;
