// import Params from "./params";

const BASE_URL_V1 = "/api/v1";

const ServerRoute = {
  Health: {
    BASE: "/health",
  },
  Auth: {
    BASE: `${BASE_URL_V1}/auth`,
    REGISTER: `${BASE_URL_V1}/auth/register`,
    LOGIN: `${BASE_URL_V1}/auth/login`,
    REFRESH: `${BASE_URL_V1}/auth/refresh`,
    LOGOUT: `${BASE_URL_V1}/auth/logout`,
    VERIFY_EMAIL: `${BASE_URL_V1}/auth/email/verify`,
    // VERIFY_EMAIL_WITH_PARAMS: `/email/verify/:${Params.Email.CODE}`,
    FORGOT_PASSWORD: `${BASE_URL_V1}/auth/password/forgot`,
    RESET_PASSWORD: `${BASE_URL_V1}/auth/password/reset`,
  },
  User: {
    BASE: `${BASE_URL_V1}/user`,
  },
};

export { BASE_URL_V1, ServerRoute };
