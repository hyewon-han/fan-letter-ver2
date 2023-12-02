import axios from "axios";

const instance = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});

export default instance;
