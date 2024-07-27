import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginSchema } from "../validation/authValidation";
import { loginMutationApi } from "../api/apiAuth";
import { TLoginForm } from "../types/authTypes";

const defaultLoginFormValues: TLoginForm = {
  email: "",
  password: "",
};

export const useLogin = () => {
  const navigate = useNavigate();

  // Form
  const form = useForm<TLoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultLoginFormValues,
  });

  // Mutation
  const loginMutation = useMutation({
    mutationFn: loginMutationApi,
    onSuccess: () => {
      toast.success("Signed in!");
      navigate("/", {
        replace: true,
      });
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  // Submit Handler
  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    loginMutation.mutate(data);
    console.log(data);
  };

  return { form, onSubmit, loginMutation };
};
