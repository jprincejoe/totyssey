import { Form } from "@/components/ui/form";
import FormInput from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  // Register Hook
  const { form, onSubmit, mutation } = useRegister();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <div className="space-y-4">
          {/* First Name */}
          <FormInput
            control={form.control}
            name="firstName"
            label="First Name"
            placeholder="John"
          />

          {/* Last Name */}
          <FormInput
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Doe"
          />
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

          {/* Confirm Password */}
          <FormInput
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Registering..." : "Register"}
        </Button>

        {/* Already have an account? */}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-totysseyBlue">
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
