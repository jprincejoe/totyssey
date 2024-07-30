import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/userApi";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: () => userApi.getUser(),
    retry: false,
  });
};
