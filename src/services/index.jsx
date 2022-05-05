import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common.Authorization = token;
  } else {
    delete API.defaults.headers.common.Authorization;
  }
};

export default API;
