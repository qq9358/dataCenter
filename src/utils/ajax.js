import axios from "axios";
import tokenService from "@/services/tokenService.js";
import ipHelper from "./ipHelper.js";

const baseURL = ipHelper.isIntranetIp(window.location.href)
  ? window.webApiIntranetUrl
  : window.webApiOuterNetUrl;

const ajax = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

ajax.interceptors.request.use(
  function (config) {
    const token = tokenService.getToken();
    if (token) {
      config.headers.common["Authorization"] = `${token.token_type} ${
        token.access_token
        }`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

ajax.interceptors.response.use(
  response => {

    return response.data;
  },
  error => {

    return Promise.reject(error);
  }
);
export default ajax;
