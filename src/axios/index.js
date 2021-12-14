import axios from "axios";

export const api = axios.create({
  baseURL: "https://cryptointelligence.herokuapp.com/institute",
});
