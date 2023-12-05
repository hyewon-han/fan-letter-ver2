import axios from "axios";

const jsonApi = axios.create({
  baseURL: "https://serious-shade-weeder.glitch.me",
});

jsonApi.interceptors.request.use(
  (config) => {
    console.log("json-server 요청 성공!");
    return config;
  },
  (error) => {
    console.log("json-server 요청 실패!");
    return Promise.reject(error);
  }
);

jsonApi.interceptors.response.use(
  (response) => {
    console.log("json-server 응답 받았다!");
    return response;
  },
  (error) => {
    console.log("json-server 응답 못받았다!");
    return Promise.reject(error);
  }
);

export default jsonApi;
