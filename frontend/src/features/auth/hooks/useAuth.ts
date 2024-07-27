import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/apiAuth";

export const AUTH = "auth";

const useAuth = (opts = {}) => {
  const { data: user, ...rest } = useQuery({
    queryKey: [AUTH],
    queryFn: authApi.getUser,
    staleTime: Infinity,
    ...opts,
  });

  //   console.log("User: ", user);
  //   console.log("Rest: ", { ...rest });

  return {
    user,
    ...rest,
  };
};

export default useAuth;
