import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MainNavVisitor = () => {
  return (
    <Link to="/login">
      <Button variant="ghost" className="font-bold">
        Log In
      </Button>
    </Link>
  );
};

export default MainNavVisitor;
