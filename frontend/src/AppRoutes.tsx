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
import { setNavigate } from "./lib/navigation";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
  // For refresh token navigation in api client
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="user-profile" element={<ProtectedRoute />}>
          <Route index element={<UserProfilePage />} />
        </Route>
        <Route path={ClientRoute.Auth.REGISTER} element={<RegisterPage />} />
        <Route path={ClientRoute.Auth.LOGIN} element={<LoginPage />} />
        <Route
          path={ClientRoute.Auth.VERIFY_EMAIL}
          element={<VerifyEmailPage />}
        />
        <Route
          path={ClientRoute.Auth.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />
        <Route
          path={ClientRoute.Auth.RESET_PASSWORD}
          element={<ResetPasswordPage />}
        />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<Navigate to={ClientRoute.Root.BASE} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
