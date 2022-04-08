import axios from "axios";

export const api = axios.create({
  // baseURL: "//ec2-35-175-145-167.compute-1.amazonaws.com:8080/institute",
  // baseURL: "http://ec2-44-195-70-194.compute-1.amazonaws.com:8080/institute",
  // baseURL: "https://cryptointelligence.herokuapp.com/institute",
  baseURL:
    "http://ec2-65-2-35-122.ap-south-1.compute.amazonaws.com:8080/institute",
});
