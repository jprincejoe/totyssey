import PARAMS from "./params";

const BASE_URL_V1 = "/api/v1";

const ROUTES = {
  HEALTH: {
    BASE: "/health",
  },
  AUTH: {
    BASE: `${BASE_URL_V1}/auth`,
    REGISTER: "/register",
    LOGIN: "/login",
    REFRESH: "/refresh",
    LOGOUT: "/logout",
    VERIFY_EMAIL: `/email/verify`,
    VERIFY_EMAIL_WITH_PARAMS: `/email/verify/:${PARAMS.EMAIL.CODE}`,
    FORGOT_PASSWORD: "/password/forgot",
  },
};

export { BASE_URL_V1, ROUTES };
