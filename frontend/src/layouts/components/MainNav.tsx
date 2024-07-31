import { useAuthStore } from "@/stores/authStore";
import MainNavAuth from "./MainNavAuth";
import MainNavVisitor from "./MainNavVisitor";

const MainNav = () => {
  const { user } = useAuthStore();

  return user ? <MainNavAuth /> : <MainNavVisitor />;
};

export default MainNav;
