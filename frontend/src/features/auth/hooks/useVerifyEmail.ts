import { ClientRoute } from "@/constants/clientRoutes";
import Params from "@/constants/params";
import { verifyEmailQueryApi } from "@/features/auth/api/apiAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useVerifyEmail = () => {
  // Navigation
  const navigate = useNavigate();

  const { [Params.Email.CODE]: code } = useParams();

  const { isPending, isError, isSuccess, error } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmailQueryApi(code ?? ""),
    enabled: !!code,
  });

  // Loading spinner
  // if (isPending) {
  //     return <LoadingSpinner />;
  //   }

  // Error
  if (isError) {
    toast.error(error?.message);
    navigate(ClientRoute.Home.BASE);
  }

  // Success
  if (isSuccess) {
    toast.success("Email verified!");
    navigate(ClientRoute.Home.BASE);
  }

  return { isPending, isError, isSuccess, error };
};
