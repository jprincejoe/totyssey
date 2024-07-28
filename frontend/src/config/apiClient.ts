// Fix for typescript
declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

import axios, { AxiosError, AxiosResponse } from "axios";

// Options
const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

// Axios instance
const API = axios.create(options);

// Middleware
API.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T => response.data,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;
      console.log(data);
      if (data && typeof data === "object") {
        return Promise.reject({ status, ...data });
      } else {
        return Promise.reject({ status, data });
      }
    } else {
      console.error("An error has occurred", error.message);
      return Promise.reject({ status: null, message: error.message });
    }
  }
);

// API.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     if (error.response) {
//       const { status, data } = error.response;
//       console.log(data);
//       return Promise.reject({ status, ...data });
//     } else {
//       console.error("An error has occured", error.message);
//       return Promise.reject({ status: null, message: error.message });
//     }
//   }
// );

export default API;
