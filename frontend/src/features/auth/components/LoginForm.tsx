import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const { form, onSubmit, mutation } = useLogin();

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

          {/* Password */}
          <FormInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
        </div>

        {/* Forgot Password */}
        <Link to="/forgot-password" className="ml-auto inline-block text-sm">
          <p className="text-totysseyBlue">Forgot password?</p>
        </Link>

        {/* Submit Button */}
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>

        {/* Don't have an account? */}
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-totysseyBlue">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
