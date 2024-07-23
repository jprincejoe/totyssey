import Params from "./params";

const BASE_URL_V1 = "/api/v1";

const Route = {
  Health: {
    BASE: "/health",
  },
  Auth: {
    BASE: `${BASE_URL_V1}/auth`,
    REGISTER: "/register",
    LOGIN: "/login",
    REFRESH: "/refresh",
    LOGOUT: "/logout",
    VERIFY_EMAIL: `/email/verify`,
    VERIFY_EMAIL_WITH_PARAMS: `/email/verify/:${Params.Email.CODE}`,
    FORGOT_PASSWORD: "/password/forgot",
    RESET_PASSWORD: "/password/reset",
  },
  User: {
    BASE: `${BASE_URL_V1}/user`,
  },
};

export { BASE_URL_V1, Route };
