import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPasswordForm = () => {
  // Reset Password Hook
  const { form, onSubmit, mutation, isValid } = useResetPassword();

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
                  <FormInput
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                  />

                  {/* Confirm Password */}
                  <FormInput
                    control={form.control}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    type="password"
                  />
                  {/* Submit Button */}
                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending
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

export default ResetPasswordForm;
