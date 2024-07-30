import { useEffect } from "react";
import { useGetUser } from "./features/user/hooks/useGetUser";
import { useAuthStore } from "./stores/authStore";
import LoadingSpinner from "./components/LoadingSpinner";

const GetUserWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isPending, isError, data } = useGetUser();
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    if (!isPending) {
      if (data) {
        setUser(data);
      } else {
        clearUser();
      }
    }
  }, [isPending, isError]);

  if (isPending) {
    return (
      <LoadingSpinner className="min-h-screen min-w-screen justify-center items-center" />
    );
  }

  return <>{children}</>;
};

export default GetUserWrapper;
