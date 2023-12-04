import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.REACT_APP_AUTH_SERVER_URL,
});

export default authApi;
