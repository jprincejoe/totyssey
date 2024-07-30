import Params from "./params";

const ClientRoute = {
  Root: {
    BASE: `/`,
  },
  // Home: {
  //   BASE: `/`,
  // },
  Auth: {
    REGISTER: `/register`,
    LOGIN: `/login`,
    LOGOUT: `/logout`,
    VERIFY_EMAIL: `/email/verify/:${Params.Email.CODE}`,
    FORGOT_PASSWORD: `/password/forgot`,
    RESET_PASSWORD: `/password/reset`,
  },
  User: {
    PROFILE: `/user-profile`,
  },
};

export { ClientRoute };
