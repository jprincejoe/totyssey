//#region Imports

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/validation/authValidation";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import RHFInput from "@/components/RHFInput";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ClientRoute } from "@/constants/clientRoutes";

//#endregion

type LoginFormData = z.infer<typeof LoginSchema>;

const defaultLoginFormValues: LoginFormData = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();

  // RHF Form
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultLoginFormValues,
  });

  // RQ Mutate
  const loginMutation = useMutation({
    mutationFn: apiClient.login,
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

  // Component
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="space-y-4">
          {/* Email */}
          <RHFInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="john.doe@example.com"
            type="email"
          />

          {/* Password */}
          <RHFInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
        </div>

        {/* Forgot Password */}
        <Link
          to={ClientRoute.Auth.FORGOT_PASSWORD}
          className="ml-auto inline-block text-sm"
        >
          <p className="text-totysseyBlue">Forgot password?</p>
        </Link>

        <Button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>

        {/* Don't have an account? */}
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={ClientRoute.Auth.REGISTER} className="text-totysseyBlue">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
