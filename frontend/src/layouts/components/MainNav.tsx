import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useStore } from "@/stores/store";

const MainNav = () => {
  const user = useStore((state) => state.user);

  return user ? (
    <div>
      <p>Hello </p>
      <p>{user.firstName + " " + user.lastName}</p>
      <Link to="/logout">
        <Button variant="ghost" className="font-bold">
          Log Out
        </Button>
      </Link>
    </div>
  ) : (
    <Link to="/login">
      <Button variant="ghost" className="font-bold">
        Log In
      </Button>
    </Link>
  );
};

export default MainNav;
