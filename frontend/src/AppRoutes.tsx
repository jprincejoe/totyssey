import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ClientRoute } from "./constants/clientRoutes";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home */}
      <Route
        path={ClientRoute.Home.BASE}
        element={
          <Layout heroVisibility={true}>
            <HomePage />
          </Layout>
        }
      />
      {/* Register */}
      <Route
        path={ClientRoute.Auth.REGISTER}
        element={
          <Layout>
            <RegisterPage />
          </Layout>
        }
      />
      {/* Login */}
      <Route path={ClientRoute.Auth.LOGIN} element={<LoginPage />} />

      {/* Verify Email */}
      <Route
        path={ClientRoute.Auth.VERIFY_EMAIL}
        element={
          <Layout>
            <VerifyEmailPage />
          </Layout>
        }
      />

      {/* Forgot Password */}
      <Route
        path={ClientRoute.Auth.FORGOT_PASSWORD}
        element={
          <Layout>
            <ForgotPasswordPage />
          </Layout>
        }
      />

      {/* Reset Password */}
      <Route
        path={ClientRoute.Auth.RESET_PASSWORD}
        element={
          <Layout>
            <ResetPasswordPage />
          </Layout>
        }
      />
      <Route path="/*" element={<Navigate to={ClientRoute.Home.BASE} />} />
    </Routes>
  );
};

export default AppRoutes;
