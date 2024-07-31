import LoadingSpinner from "@/components/LoadingSpinner";
import { useVerifyEmail } from "@/features/auth/hooks/useVerifyEmail";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmailPage = () => {
  // Navigation
  const navigate = useNavigate();

  // Verify Email Hook
  const { isPending, isError, isSuccess, error } = useVerifyEmail();

  // Loading spinner
  if (isPending) {
    return <LoadingSpinner />;
  }

  // Error
  if (isError) {
    toast.error(error?.message);
    navigate("/");
    return <></>;
  }

  // Success
  if (isSuccess) {
    toast.success("Email verified!");
    navigate("");
    return <></>;
  }
};

export default VerifyEmailPage;
