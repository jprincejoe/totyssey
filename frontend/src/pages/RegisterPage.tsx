//#region Imports

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import RHFInput from "@/components/RHFInput";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterSchema } from "@/features/auth/validation/authValidation";
import { registerMutationApi } from "@/features/auth/api/apiAuth";

//#endregion

type RegisterFormData = z.infer<typeof RegisterSchema>;

const defaultRegisterFormValues: RegisterFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate();

  // RHF Form
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: defaultRegisterFormValues,
  });

  // RQ Mutate
  const registerMutation = useMutation({
    mutationFn: registerMutationApi,
    onSuccess: () => {
      toast.success("Account created!");
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
  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    registerMutation.mutate(data);
    console.log(data);
  };

  // Component
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* First & Last Name */}
            <div className="flex flex-col md:flex-row gap-x-4 space-y-6 md:space-y-0">
              {/* First Name */}
              <RHFInput
                className="flex-1"
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="John"
              />

              {/* Last Name */}
              <RHFInput
                className="flex-1"
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Doe"
              />
            </div>

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

            {/* Confirm Password */}
            <RHFInput
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
          <Button type="submit" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Register;
