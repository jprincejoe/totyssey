import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TForgotPassword } from "../types/authTypes";
import { authApi } from "../api/authApi";
import { authSchema } from "../validation/authValidation";

// Default Values
const defaultValues: TForgotPassword = {
  email: "",
};

export const useForgotPassword = () => {
  // Navigation
  const navigate = useNavigate();

  // Form
  const form = useForm<TForgotPassword>({
    resolver: zodResolver(authSchema.ForgotPassword),
    defaultValues,
  });

  // On Success
  const onSuccess = () => {
    toast.success("Password reset sent");
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
    mutationFn: authApi.forgotPassword,
    onSuccess,
    onError,
  });

  // Submit Handler
  const onSubmit = async (data: TForgotPassword) => {
    mutation.mutate(data);
    console.log(data);
  };

  return { form, onSubmit, mutation };
};
