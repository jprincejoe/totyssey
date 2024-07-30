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
import PrivateRoute from "./components/PrivateRoute";
import { userApi } from "./features/user/api/userApi";
import { useStore } from "./stores/store";
import { useQuery } from "@tanstack/react-query";
import { TUser } from "./features/auth/types/authTypes";
import { useEffect } from "react";

const AppRoutes = () => {
  // For refresh token navigation in api client
  const navigate = useNavigate();
  setNavigate(navigate);

  const { setUser, logout } = useStore();

  const { data, isLoading, isError, isSuccess, error, refetch } =
    useQuery<TUser>({
      queryKey: ["getUser"],
      queryFn: () => userApi.getUser(),
      enabled: false, // Initially disabled
    });

  useEffect(() => {
    // Fetch user data on initial render
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    // if (isError) {
    //   console.error(error);
    //   logout();
    // }

    if (isSuccess && data) {
      setUser(data);
    }
  }, [isLoading, isError, isSuccess, data, error, logout, navigate, setUser]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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

      <Route element={<PrivateRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
      </Route>

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
