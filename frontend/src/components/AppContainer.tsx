import useAuth from "@/features/auth/hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";
import { Navigate, Outlet } from "react-router-dom";
import { ClientRoute } from "@/constants/clientRoutes";

const AppContainer = () => {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <LoadingSpinner />
  ) : user ? (
    <div>
      <p>User Menu Here</p>
      <Outlet />
    </div>
  ) : (
    <Navigate
      to={ClientRoute.Auth.LOGIN}
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
};

export default AppContainer;
