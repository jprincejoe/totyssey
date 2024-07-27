//#region Imports

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import LoginForm from "@/components/LoginForm";

//#endregion

const Login = () => {
  // Component
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Sign-In
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

export default Login;
