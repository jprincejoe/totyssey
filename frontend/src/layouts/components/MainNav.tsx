import { useAuth } from "../../contexts/AuthContext";
import MainNavAuth from "./MainNavAuth";
import MainNavVisitor from "./MainNavVisitor";

const MainNav = () => {
  const auth = useAuth();

  return auth.user ? <MainNavAuth /> : <MainNavVisitor />;
};

export default MainNav;
