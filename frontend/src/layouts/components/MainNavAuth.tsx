import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import UsernameMenu from "./UsernameMenu";

const MainNavAuth = () => {
  return (
    <div className="flex space-x-2 items-center">
      <Link to="/add-event">
        <Button className="font-bold">Create Event</Button>
      </Link>
      <UsernameMenu />
    </div>
  );
};

export default MainNavAuth;
