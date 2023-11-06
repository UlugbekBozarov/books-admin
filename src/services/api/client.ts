import { get } from "lodash";
import axios from "axios";

import { getAuthorizationToken, getLanguage } from "../storage/custom";

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": getLanguage(),
    "Utc-Offset": new Date().getTimezoneOffset(),
    Authorization: getAuthorizationToken()
      ? `Bearer ${getAuthorizationToken()}`
      : undefined,
  },
});

client.interceptors.request.use(
  (config) => {
    if (window.location.origin.includes("localhost")) {
      // config.headers.username = "dev";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return get(response, "data");
  },
  (error) => {
    return Promise.reject(error?.response?.data);
  }
);

export default client;
