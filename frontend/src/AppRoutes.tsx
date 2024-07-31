import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import { setNavigate } from "./lib/navigation";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import EventDetailsPage from "./pages/AddEventPage";
import Params from "./constants/params";

const AppRoutes = () => {
  // For refresh token navigation in api client
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/user-profile" element={<ProtectedRoute />}>
          <Route index element={<UserProfilePage />} />
        </Route>

        <Route path="/add-event" element={<ProtectedRoute />}>
          <Route index element={<EventDetailsPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path={`/verify-email/:${Params.Email.CODE}`}
          element={<VerifyEmailPage />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
