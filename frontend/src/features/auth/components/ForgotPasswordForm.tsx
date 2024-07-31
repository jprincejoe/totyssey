import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClientRoute } from "@/constants/clientRoutes";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

const ForgotPasswordForm = () => {
  // Forgot Password Hook
  const { form, onSubmit, mutation } = useForgotPassword();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="space-y-4">
          {/* Email */}
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="john.doe@example.com"
            type="email"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending
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
          <Link to={ClientRoute.Auth.REGISTER} className="text-totysseyBlue">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
