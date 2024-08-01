import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Link } from "react-router-dom";

const MainNavAuth = () => {
  const auth = useAuth();
  const { mutation } = useLogout();

  const handleLogout = () => {
    console.log("In handleLogout of MainNavAuth");
    mutation.mutate();
  };

  return (
    <div className="flex gap-4">
      <Link to="/add-event">
        <Button className="font-bold">Create Event</Button>
      </Link>
      <Link to="/user-profile">
        <Button variant="ghost" className="font-bold">
          {`Profile ${auth?.user?.firstName}`}
        </Button>
      </Link>
      <Button onClick={handleLogout} variant="ghost" className="font-bold">
        Logout
      </Button>
    </div>
  );
};

export default MainNavAuth;
