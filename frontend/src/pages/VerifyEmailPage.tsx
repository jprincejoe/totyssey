import LoadingSpinner from "@/components/LoadingSpinner";
import { ClientRoute } from "@/constants/clientRoutes";
import Params from "@/constants/params";
import { verifyEmailQueryApi } from "@/features/auth/api/apiAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { [Params.Email.CODE]: code } = useParams();

  const verifyEmailQuery = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmailQueryApi(code ?? ""),
    enabled: !!code,
  });

  // Loading spinner
  if (verifyEmailQuery.isPending) {
    return <LoadingSpinner />;
  }

  // Error
  if (verifyEmailQuery.isError) {
    toast.error(verifyEmailQuery.error.message);
    navigate(ClientRoute.Home.BASE);
    return <></>;
  }

  // Success
  if (verifyEmailQuery.isSuccess) {
    toast.success("Email verified!");
    navigate(ClientRoute.Home.BASE);
    return <></>;
  }
};

export default VerifyEmail;
