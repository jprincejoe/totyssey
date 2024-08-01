import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/userApi";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: () => userApi.getUser(),
    staleTime: 0,
    retry: false,
  });
};
