import { Form } from "@/components/ui/form";
import RHFInput from "@/components/RHFInput";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClientRoute } from "@/constants/clientRoutes";
import { useLogin } from "../hooks/loginHook";

const LoginForm = () => {
  const { form, onSubmit, loginMutation } = useLogin();

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

        {/* Submit Button */}
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
