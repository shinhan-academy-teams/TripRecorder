import api from "./axios";
import Cookies from "js-cookie";

const checkDuplicateId = (userId) => {
  return api
    .post("/auth/signup/useridCheck", { userId })
    .then((res) => {
      console.log(res);
      return res.data;
    })
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
    .post("/auth/login", {
      userId,
      userPw,
    })
    .then((res) => {
      const token = res.headers.authorization;
      Cookies.set("jwtToken", token, { expires: 1, secure: true });

      return res;
    })
    .catch((err) => console.log(err));
};

const TripRegistration = (tripName, tripDest, tripStart, tripEnd, tripExp) => {
  return api
    .post("/trip/register", {
      tripName,
      tripDest,
      tripStart,
      tripEnd,
      tripExp,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const ResigerExpCard = (
  tripNo,
  snsNo,
  cardNo,
  expTitle,
  expPlace,
  expAddress,
  expMoney,
  expTime,
  expWay,
  expCate
) => {
  return api
    .post("/exp/register", {
      tripNo,
      snsNo,
      cardNo,
      exp: {
        expTitle,
        expPlace,
        expAddress,
        expMoney,
        expTime,
        expWay,
        expCate,
      },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const RegisterExpCash = (
  tripNo,
  snsNo,
  cardNo,
  expTitle,
  expPlace,
  expAddress,
  expMoney,
  expTime,
  expWay,
  expCate
) => {
  return api
    .post("/exp/register", {
      tripNo,
      snsNo,
      cardNo,
      exp: {
        expTitle,
        expPlace,
        expAddress,
        expMoney,
        expTime,
        expWay,
        expCate,
      },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

//영수증 주소 전달
const ReceiptAddress = (receiptAddress) => {
  return api
    .post("img/imgrequest", {receiptAddress})
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

//sns등록
const RegisterSns = (tripNo, hashTag, snsTitle, snsContent, snsPhoto, snsScope)=>{
  return api
  .post("/sns/register",{
    tripNo,
    hashTag,
    sns : {
      snsTitle, 
      snsContent,
      snsPhoto,
      snsScope
    }
  })
}

const authService = {
  checkDuplicateId,
  checkDuplicateNick,
  checkDuplicateEmail,
  login,
  signup,
  TripRegistration,
  ResigerExpCard,
  RegisterExpCash,
  ReceiptAddress,
  RegisterSns
};

export default authService;
