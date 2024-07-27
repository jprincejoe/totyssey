import { Form } from "@/components/ui/form";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useRegister } from "../hooks/useRegister";

const RegisterForm = () => {
  // Register Hook
  const { form, onSubmit, mutation } = useRegister();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* First & Last Name */}
          <div className="flex flex-col md:flex-row gap-x-4 space-y-6 md:space-y-0">
            {/* First Name */}
            <FormInput
              className="flex-1"
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="John"
            />

            {/* Last Name */}
            <FormInput
              className="flex-1"
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Doe"
            />
          </div>

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
          {/* <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="John" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Doe" />
              </FormControl>
            </FormItem>
          )}
        /> */}
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
