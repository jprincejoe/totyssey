import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TLogin } from "../types/authTypes";
import { authApi } from "../api/apiAuth";
import { authSchema } from "../validation/authValidation";

// Default Values
const defaultValues: TLogin = {
  email: "",
  password: "",
};

export const useLogin = () => {
  // Navigation
  const navigate = useNavigate();

  // Form
  const form = useForm<TLogin>({
    resolver: zodResolver(authSchema.Login),
    defaultValues,
  });

  // On Success
  const onSuccess = () => {
    toast.success("Signed in!");
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
    mutationFn: authApi.login,
    onSuccess,
    onError,
  });

  // Submit Handler
  const onSubmit = async (data: TLogin) => {
    mutation.mutate(data);
    console.log(data);
  };

  return { form, onSubmit, mutation };
};
