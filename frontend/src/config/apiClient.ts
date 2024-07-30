// Fix for typescript
declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

import AppErrorCode from "@/constants/appErrorCode";
import { TErrorResponse } from "@/types/apiError";
import axios, { AxiosError, AxiosResponse } from "axios";
import queryClient from "./queryClient";
import { navigate } from "@/lib/navigation";
import { ClientRoute } from "@/constants/clientRoutes";
import { ServerRoute } from "@/constants/serverRoutes";

// Options
const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

// API for token refresh
const TokenRefreshClient = axios.create(options);

// Middleware for refresh client
TokenRefreshClient.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T => response.data
);

// Axios instance
const API = axios.create(options);

// Middleware for API
API.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T => response.data,
  async (error: AxiosError<TErrorResponse>) => {
    if (error.response) {
      const { config, response } = error;
      const { status, data } = response || {};

      // Try to refresh access token behind the scenes
      if (
        status === 401 &&
        data?.appErrorCode === AppErrorCode.INVALID_ACCESS_TOKEN
      ) {
        try {
          console.log("Trying to refresh token...");
          await TokenRefreshClient.get(ServerRoute.Auth.REFRESH);
          if (config !== undefined) {
            console.log("Successfully refreshed token!");
            return TokenRefreshClient(config);
          }
        } catch (error) {
          console.log("In error in refresh apiClient");
          // remove queries from cache
          queryClient.clear();
          navigate(ClientRoute.Root.BASE, {
            state: {
              redirectUrl: window.location.pathname,
            },
          });
        }
      }

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

export default API;
