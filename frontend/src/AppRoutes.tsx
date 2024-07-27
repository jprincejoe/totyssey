import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ClientRoute } from "./constants/clientRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home */}
      <Route
        path={ClientRoute.Home.BASE}
        element={
          <Layout heroVisibility={true}>
            <Home />
          </Layout>
        }
      />
      {/* Register */}
      <Route
        path={ClientRoute.Auth.REGISTER}
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      {/* Login */}
      <Route path={ClientRoute.Auth.LOGIN} element={<Login />} />

      {/* Verify Email */}
      <Route
        path={ClientRoute.Auth.VERIFY_EMAIL}
        element={
          <Layout>
            <VerifyEmail />
          </Layout>
        }
      />

      {/* Forgot Password */}
      <Route
        path={ClientRoute.Auth.FORGOT_PASSWORD}
        element={
          <Layout>
            <ForgotPassword />
          </Layout>
        }
      />

      {/* Reset Password */}
      <Route
        path={ClientRoute.Auth.RESET_PASSWORD}
        element={
          <Layout>
            <ResetPassword />
          </Layout>
        }
      />
      <Route path="/*" element={<Navigate to={ClientRoute.Home.BASE} />} />
    </Routes>
  );
};

export default AppRoutes;
