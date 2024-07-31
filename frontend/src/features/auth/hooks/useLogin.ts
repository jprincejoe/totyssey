import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { TLogin, TUser } from "../types/authTypes";
import { authApi } from "../api/authApi";
import { authSchema } from "../validation/authValidation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores/authStore";
import { useLayoutEffect } from "react";

// Default Values
const defaultValues: TLogin = {
  email: "",
  password: "",
};

export const useLogin = () => {
  // Navigation
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  // Form
  const form = useForm<TLogin>({
    resolver: zodResolver(authSchema.Login),
    defaultValues,
  });

  // Log user state whenever it changes
  useLayoutEffect(() => {
    if (user) {
      navigate("/", {
        replace: true,
      });
    }
  }, [user]);

  // On Success
  const onSuccess = (data: TUser) => {
    setUser(data);
  };

  // On Error
  const onError = (error: Error) => {
    console.log(error.message);
    navigate("/login");
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
  };

  return { form, onSubmit, mutation };
};
