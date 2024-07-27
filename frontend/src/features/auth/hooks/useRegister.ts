import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterSchema } from "../validation/authValidation";
import { registerMutationApi } from "../api/apiAuth";
import { TRegister } from "../types/authTypes";

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
    resolver: zodResolver(RegisterSchema),
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
    mutationFn: registerMutationApi,
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
