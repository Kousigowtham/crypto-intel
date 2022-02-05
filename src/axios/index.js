import axios from "axios";

export const api = axios.create({
  // baseURL: "//ec2-35-175-145-167.compute-1.amazonaws.com:8080/institute",
  baseURL: "https://cryptointelligence.herokuapp.com/institute",
});
