import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api/authApi";
import { useAuth } from "@/contexts/authContext";

export const useLogout = () => {
  // Navigation
  const navigate = useNavigate();
  const auth = useAuth();

  // On Success
  const onSuccess = () => {
    console.log("In onSuccess of useLogout...");
    auth.logout();
    navigate("/", {
      replace: true,
    });
  };

  // On Error
  const onError = (error: Error) => {
    console.log(error.message);
    toast.error(error.message);
    navigate("/", {
      replace: true,
    });
  };

  // Mutation
  const mutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess,
    onError,
  });

  return { mutation };
};
