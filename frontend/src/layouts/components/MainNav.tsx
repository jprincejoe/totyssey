import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClientRoute } from "@/constants/clientRoutes";
import { useAuthStore } from "@/stores/authStore";

const MainNav = () => {
  const { user, clearUser } = useAuthStore();

  const handleLogout = () => {
    clearUser();
  };

  return user ? (
    <div className="flex gap-4">
      <Link to={ClientRoute.User.PROFILE}>
        <Button variant="ghost" className="font-bold">
          Profile
        </Button>
      </Link>
      <Button onClick={handleLogout} variant="ghost" className="font-bold">
        Logout
      </Button>
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
