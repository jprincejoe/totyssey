import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useStore } from "@/stores/store";
import { ClientRoute } from "@/constants/clientRoutes";
import { useLogout } from "@/features/auth/hooks/useLogout";

const MainNav = () => {
  const { user, logout } = useStore();

  const { mutation } = useLogout();

  const handleLogout = () => {
    mutation.mutate();
    logout();
  };

  return user ? (
    <div className="flex items-center">
      <div className="flex">
        <p>Hello, </p>
        <p>{user.firstName}</p>
      </div>
      <Link to={ClientRoute.User.PROFILE}>
        <Button variant="ghost" className="font-bold">
          Profile
        </Button>
      </Link>
      <Button onClick={handleLogout} variant="ghost" className="font-bold">
        Log Out
      </Button>
      {/* <Link to={ClientRoute.Auth.LOGOUT}>
        <Button variant="ghost" className="font-bold">
          Log Out
        </Button>
      </Link> */}
    </div>
  ) : (
    <Link to={ClientRoute.Auth.LOGIN}>
      <Button variant="ghost" className="font-bold">
        Log In
      </Button>
    </Link>
  );
};

export default MainNav;
