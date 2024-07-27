import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TResetPassword } from "../types/authTypes";
import { validateSearchParam } from "@/utils/searchParams";
import Params from "@/constants/params";
import { authApi } from "../api/apiAuth";
import { authSchema } from "../validation/authValidation";

// Default Values
const defaultValues: TResetPassword = {
  password: "",
  confirmPassword: "",
  verificationCode: "",
};

export const useResetPassword = () => {
  // Navigation
  const navigate = useNavigate();

  // Get values from search params URL
  const code = validateSearchParam(
    Params.Email.CODE,
    authSchema.VerificationCode
  );
  const exp = validateSearchParam(
    Params.Email.EXPIRATION,
    authSchema.Expiration
  );

  // Get the current time
  const now: number = Date.now();

  // Determine if the code is valid
  const isValid: boolean = !!code && exp !== null && !isNaN(exp) && exp > now;

  // Form
  const form = useForm<TResetPassword>({
    resolver: zodResolver(authSchema.ResetPassword),
    defaultValues,
  });

  // On Success
  const onSuccess = () => {
    toast.success("Password reset!");
    navigate("/", {
      replace: true,
    });
  };

  // On Error
  const onError = (error: Error) => {
    console.log(error.message);
    toast.error(error.message);
  };

  // Mutation
  const mutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess,
    onError,
  });

  // Submit Handler
  const onSubmit = async (data: TResetPassword) => {
    mutation.mutate(data);
    console.log(data);
  };

  return { form, onSubmit, mutation, isValid };
};
