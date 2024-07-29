import { ClientRoute } from "@/constants/clientRoutes";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userApi } from "../api/userApi";
import { TUser } from "@/features/auth/types/authTypes";

export const useUser = () => {
  // Navigation
  const navigate = useNavigate();

  const { data, isPending, isError, isSuccess, error } = useQuery<TUser>({
    queryKey: ["getUser"],
    queryFn: () => userApi.getUser(),
  });

  // Error
  //   if (isError) {
  //     toast.error(error?.message);
  //     navigate(ClientRoute.Root.BASE);
  //   }

  // Success
  if (isSuccess) {
    toast.success("Successfully got user details!");
    navigate(ClientRoute.Root.BASE);
  }

  return { data, isPending, isError, isSuccess, error };
};
