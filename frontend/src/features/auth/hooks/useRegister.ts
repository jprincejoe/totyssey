import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TRegister } from "../types/authTypes";
import { authApi } from "../api/apiAuth";
import { authSchema } from "../validation/authValidation";

// Default Values
const defaultValues: TRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const useRegister = () => {
  // Navigation
  const navigate = useNavigate();

  // Form
  const form = useForm<TRegister>({
    resolver: zodResolver(authSchema.Register),
    defaultValues,
  });

  // On Success
  const onSuccess = () => {
    toast.success("Account created!");
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
    mutationFn: authApi.register,
    onSuccess,
    onError,
  });

  // Submit Handler
  const onSubmit = async (data: TRegister) => {
    mutation.mutate(data);
    console.log(data);
  };

  return { form, onSubmit, mutation };
};
