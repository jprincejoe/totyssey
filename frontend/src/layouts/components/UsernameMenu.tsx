import Icon from "@/components/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { FA, IconWeight } from "@/constants/Icons";
import { useAuth } from "@/contexts/AuthContext";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Link } from "react-router-dom";

const UsernameMenu = () => {
  const { user } = useAuth();
  const { mutation } = useLogout();

  return (
    <DropdownMenu>
      {/* User Icon & Email */}
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:opacity-75">
        <Icon icon={FA.User} iconWeight={IconWeight.Solid} className="mr-2" />
        {user?.email ?? "Hello"}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-40">
        {/* User Profile */}
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem onClick={() => mutation.mutate()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
