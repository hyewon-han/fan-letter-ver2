import axios from "axios";

const instance = axios.create({
  baseURL: "https://hexagonal-uttermost-sousaphone.glitch.me",
});

export default instance;
