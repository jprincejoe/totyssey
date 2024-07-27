//#region Imports

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExpirationSchema,
  ResetPasswordSchema,
  VerificationCodeSchema,
} from "@/validation/authValidation";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import RHFInput from "@/components/RHFInput";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../lib/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientRoute } from "@/constants/clientRoutes";
import Params from "@/constants/params";
import { validateSearchParam } from "@/utils/searchParams";

//#endregion

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

const defaultFormValues: ResetPasswordFormData = {
  password: "",
  confirmPassword: "",
  verificationCode: "",
};

const ResetPassword = () => {
  const navigate = useNavigate();

  // Get values from search params URL
  const code = validateSearchParam(Params.Email.CODE, VerificationCodeSchema);
  const exp = validateSearchParam(Params.Email.EXPIRATION, ExpirationSchema);

  // Get the current time
  const now: number = Date.now();

  // Determine if the code is valid
  const isValid: boolean = !!code && exp !== null && !isNaN(exp) && exp > now;

  // RHF Form
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: defaultFormValues,
  });

  // RQ Mutate
  const resetPasswordMutation = useMutation({
    mutationFn: apiClient.resetPassword,
    onSuccess: () => {
      toast.success("Password reset!");
      navigate(ClientRoute.Auth.LOGIN, {
        replace: true,
      });
    },
    onError: (error: Error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  // Submit Handler
  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    resetPasswordMutation.mutate(data);
    console.log(data);
  };
  // Component
  return (
    <>
      {isValid ? (
        <p>Invalid Code</p>
      ) : (
        <div className="flex justify-center">
          <Card className="w-[400px] shadow-md">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Reset Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col space-y-4"
                >
                  {/* Password */}
                  <RHFInput
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                  />

                  {/* Confirm Password */}
                  <RHFInput
                    control={form.control}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                  />
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={resetPasswordMutation.isPending}
                  >
                    {resetPasswordMutation.isPending
                      ? "Resetting password..."
                      : "Reset Password"}
                  </Button>

                  {/* Don't have an account? */}
                  {/* <div className="flex mt-4 text-center text-sm justify-center">
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
                </div> */}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
