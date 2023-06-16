import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "",
  headers: { "Content-type": "application/json" }, // data type
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwtToken");

    //요청시 AccessToken 계속 보내주기
    if (!token) {
      config.headers.accessToken = null;
      config.headers.refreshToken = null;
      return config;
    }

    if (config.headers && token) {
      config.headers.authorization = `${token}`;
      return config;
    }

    // Do something before request is sent
    console.log("request start", config);
  },
  (error) => {
    // Do something with request error
    console.log("request error", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // console.log("get response", response);
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      if (error.response.data.message === "expired") {
        const originalRequest = config;
        const token = Cookies.get("jwtToken");

        originalRequest.headers.authorization = `${token}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios.request(originalRequest);
      }
    }

    console.log("response error", error);
    return Promise.reject(error);
  }
);

export default api;
