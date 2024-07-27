import LoadingSpinner from "@/components/LoadingSpinner";
import { ClientRoute } from "@/constants/clientRoutes";
import Params from "@/constants/params";
import * as apiClient from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { [Params.Email.CODE]: code } = useParams();

  const emailVerificationQuery = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => apiClient.verifyEmail(code ?? ""),
    enabled: !!code,
  });

  // Loading spinner
  if (emailVerificationQuery.isPending) {
    return <LoadingSpinner />;
  }

  // Error
  if (emailVerificationQuery.isError) {
    toast.error(emailVerificationQuery.error.message);
    navigate(ClientRoute.Home.BASE);
    return <></>;
  }

  // Success
  if (emailVerificationQuery.isSuccess) {
    toast.success("Email verified!");
    navigate(ClientRoute.Home.BASE);
    return <></>;
  }
};

export default VerifyEmail;
