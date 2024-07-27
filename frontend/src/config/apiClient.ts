import axios from "axios";

// Options
const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

// Axios instance
const API = axios.create(options);

// Middleware
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { status, data } = error.response;
    console.log(data);
    return Promise.reject({ status, ...data });
  }
);

export default API;
