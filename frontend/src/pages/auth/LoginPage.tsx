import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="container flex justify-center">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <Link to="/">
            <Logo className="h-[60px] mx-auto mt-12" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
