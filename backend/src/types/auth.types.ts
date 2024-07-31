export type TCreateAccount = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TResetPassword = {
  password: string;
  verificationCode: string;
};
