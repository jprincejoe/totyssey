import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { ClientRoute } from "./constants/clientRoutes";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import { useStore } from "./stores/store";
import { useUser } from "./features/user/hooks/useUser";
import { useEffect } from "react";
import { setNavigate } from "./lib/navigation";

const AppRoutes = () => {
  const navigate = useNavigate();
  setNavigate(navigate);

  const setUser = useStore((state) => state.setUser);

  const { data: user } = useUser();

  useEffect(() => {
    if (user !== undefined) {
      setUser(user);
    }
  }, [setUser]);

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

      <Route
        path={"/privacy-policy"}
        element={
          <Layout>
            <PrivacyPolicyPage />
          </Layout>
        }
      />

      {/* Catch All */}
      <Route path="/*" element={<Navigate to={ClientRoute.Root.BASE} />} />
    </Routes>
  );
};

export default AppRoutes;
