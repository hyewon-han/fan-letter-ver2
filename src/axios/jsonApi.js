import axios from "axios";

const jsonApi = axios.create({
  baseURL: process.env.REACT_APP_JSON_SERVER_URL,
});

export default jsonApi;
