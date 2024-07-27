//#region Imports

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/validation/authValidation";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import RHFInput from "@/components/RHFInput";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ClientRoute } from "@/constants/clientRoutes";

//#endregion

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

const defaultFormValues: ForgotPasswordFormData = {
  email: "",
};

const ForgotPassword = () => {
  const navigate = useNavigate();

  // RHF Form
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: defaultFormValues,
  });

  // RQ Mutate
  const forgotPasswordMutation = useMutation({
    mutationFn: apiClient.forgotPassword,
    onSuccess: () => {
      toast.success("Password reset sent!");
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
  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    forgotPasswordMutation.mutate(data);
    console.log(data);
  };

  // Component
  return (
    <div className="flex justify-center">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={forgotPasswordMutation.isPending}>
                {forgotPasswordMutation.isPending
                  ? "Sending password reset..."
                  : "Send Password Reset"}
              </Button>

              {/* Don't have an account? */}
              <div className="flex mt-4 text-center text-sm justify-center">
                Go back to&nbsp;
                <Link to={ClientRoute.Auth.LOGIN} className="text-totysseyBlue">
                  Sign in
                </Link>
                &nbsp;<p>or</p>&nbsp;
                <Link
                  to={ClientRoute.Auth.REGISTER}
                  className="text-totysseyBlue"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
