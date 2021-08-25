import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000/",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

let authInterceptorID;

export const authenticateAPI = (token) => {
  authInterceptorID = api.defaults.headers.common["x-auth-token"] = token;
};

export const unauthenticateAPI = () => {
  api.interceptors.request.eject(authInterceptorID);
};