import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MainNav = () => {
  return (
    <Link to="/login">
      <Button variant="ghost" className="font-bold">
        Log In
      </Button>
    </Link>
  );
};

export default MainNav;
