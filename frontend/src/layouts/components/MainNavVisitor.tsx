import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClientRoute } from "@/constants/clientRoutes";

const MainNavVisitor = () => {
  return (
    <Link to={ClientRoute.Auth.LOGIN}>
      <Button variant="ghost" className="font-bold">
        Log In
      </Button>
    </Link>
  );
};

export default MainNavVisitor;
