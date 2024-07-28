import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { ClientRoute } from "./constants/clientRoutes";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home */}
      <Route
        path={ClientRoute.Root.BASE}
        element={
          <Layout heroVisibility={true}>
            <HomePage />
          </Layout>
        }
      />

      {/* <Route path={ClientRoute.Root.BASE} element={<AppContainer />}>
        <Route
          index
          element={
            <Layout heroVisibility={true}>
              <HomePage />
            </Layout>
          }
        />
      </Route> */}

      {/* Register */}
      <Route path={ClientRoute.Auth.REGISTER} element={<RegisterPage />} />

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

      {/* Catch All */}
      <Route path="/*" element={<Navigate to={ClientRoute.Root.BASE} />} />
    </Routes>
  );
};

export default AppRoutes;
