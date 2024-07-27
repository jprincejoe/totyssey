import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="flex justify-center">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
