import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <div className="flex justify-center">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
