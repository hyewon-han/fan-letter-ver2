import axios from "axios";

const authApi = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
  timeout: 1000,
});

authApi.interceptors.request.use(
  (config) => {
    console.log("auth-server 요청 성공!");
    return config;
  },
  (error) => {
    console.log("auth-server 요청 실패!");
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => {
    console.log("auth-server 응답 받았다!");
    return response;
  },
  (error) => {
    console.log("auth-server 응답 못받았다!");
    return Promise.reject(error);
  }
);

export default authApi;
