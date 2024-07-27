import RegisterForm from "@/features/auth/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
