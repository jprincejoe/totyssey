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
    if (error.response) {
      const { status, data } = error.response;
      console.log(data);
      return Promise.reject({ status, ...data });
    } else {
      console.error("An error has occured", error.message);
      return Promise.reject({ status: null, message: error.message });
    }
  }
);

export default API;
