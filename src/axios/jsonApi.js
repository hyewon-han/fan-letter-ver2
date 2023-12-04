import axios from "axios";

const jsonApi = axios.create({
  baseURL: "https://serious-shade-weeder.glitch.me",
});

export default jsonApi;
