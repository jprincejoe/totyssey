import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="border-b-2 border-b-totysseyOrange py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <Logo className="h-[60px]" />
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
