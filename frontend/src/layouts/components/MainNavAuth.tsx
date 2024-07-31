import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { Link } from "react-router-dom";

const MainNavAuth = () => {
  const { clearUser } = useAuthStore();

  const handleLogout = () => {
    clearUser();
  };

  return (
    <div className="flex gap-4">
      <Link to="/add-event">
        <Button className="font-bold">Create Event</Button>
      </Link>
      <Link to="/user-profile">
        <Button variant="ghost" className="font-bold">
          Profile
        </Button>
      </Link>
      <Button onClick={handleLogout} variant="ghost" className="font-bold">
        Logout
      </Button>
    </div>
  );
};

export default MainNavAuth;
