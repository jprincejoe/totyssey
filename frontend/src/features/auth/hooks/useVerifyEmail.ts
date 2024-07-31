import Params from "@/constants/params";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api/authApi";

export const useVerifyEmail = () => {
  // Navigation
  const navigate = useNavigate();

  const { [Params.Email.CODE]: code } = useParams();

  const { isPending, isError, isSuccess, error } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => authApi.verifyEmail(code ?? ""),
    enabled: !!code,
  });

  // Loading spinner
  // if (isPending) {
  //     return <LoadingSpinner />;
  //   }

  // Error
  if (isError) {
    toast.error(error?.message);
    navigate("/");
  }

  // Success
  if (isSuccess) {
    toast.success("Email verified!");
    navigate("/");
  }

  return { isPending, isError, isSuccess, error };
};
