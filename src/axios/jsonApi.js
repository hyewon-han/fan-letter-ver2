import axios from "axios";

const instance = axios.create({
  baseURL: "https://serious-shade-weeder.glitch.me",
});

export default instance;
