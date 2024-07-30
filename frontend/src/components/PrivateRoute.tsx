import { useUser } from "@/features/user/hooks/useUser";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { data: user, isPending } = useUser();

  if (isPending) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
